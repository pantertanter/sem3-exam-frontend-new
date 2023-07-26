import React, { useState, useEffect, useRef } from "react";
import apiFacade from "../../apiFacade";
import { Button } from "react-bootstrap";

const JokesByCat = () => {
  const [jokesByCategory, setJokesByCategory] = useState({});
  const mounted = useRef(true);
  const [callback, setCallback] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFacade.getAllJokes();
        // Group jokes by category
        const jokesGroupedByCategory = groupJokesByCategory(response);
        setJokesByCategory(jokesGroupedByCategory);
      } catch (error) {
        console.error("Error fetching jokes:", error);
      }
    };

    fetchData();

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFacade.deleteJoke(deleteId, mounted, setCallback);
        setCallback(response);
        if (!callback) {
          console.log("no callback");
        } else {
          console.log(callback);
        }        
      } catch (error) {
        console.log("Error deleting the joke:", error);
      }
    };

    fetchData();

    return () => {
      mounted.current = false;
    };
  }, [deleteId]);

  const groupJokesByCategory = (jokes) => {
    return jokes.reduce((result, joke) => {
      if (!result[joke.category]) {
        result[joke.category] = [];
      }
      result[joke.category].push(joke);
      return result;
    }, {});
  };

  if (Object.keys(jokesByCategory).length === 0) {
    return "Loading...";
  }

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  return (
    <div>
      {Object.entries(jokesByCategory).map(([category, jokes]) => (
        <div key={category}>
          <h2>{category}</h2>
          {jokes.map((joke) => (
            <div key={joke.id}>
              <p>{joke.id} : {joke.joke}</p>
              <div>
                <Button variant="warning" onClick={() => handleDelete(joke.id)}>Delete joke</Button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default JokesByCat;

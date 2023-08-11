import React, { useState, useEffect, useRef } from "react";
import apiFacade from "../../apiFacade";
import { Button } from "react-bootstrap";

const JokesByCat = () => {
  const [content, setContent] = useState();
  const mounted = useRef(true);
  const [callback, setCallback] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = apiFacade.getAllJokes(setContent, mounted);
        setContent(response);
      } catch (error) {
        console.error("Error fetching jokes:", error);
      }
    };

    fetchData();

    return () => {
      mounted.current = false;
    };
  }, [deleteId]);

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

  if (!content) {
    return "Loading...";
  }

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  // Function to group jokes by category
  const groupJokesByCategory = () => {
    const categorizedJokes = {};
    content.forEach((joke) => {
      if (!categorizedJokes[joke.category]) {
        categorizedJokes[joke.category] = [];
      }
      categorizedJokes[joke.category].push(joke);
    });
    return categorizedJokes;
  };

  const categorizedJokes = groupJokesByCategory();

  return (
    <div>
      {Object.keys(categorizedJokes).map((category) => (
        <div key={category}>
          <b>{category}</b>
          {categorizedJokes[category].map((joke) => (
            <div key={joke.id}>
              <p>{joke.joke}</p>
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
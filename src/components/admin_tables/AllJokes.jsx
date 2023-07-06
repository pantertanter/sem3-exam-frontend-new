import React, { useState, useEffect, useRef } from "react";
import apiFacade from "../../apiFacade";
import { Button } from "react-bootstrap";

const AllJokes = () => {
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = apiFacade.deleteJoke(deleteId, mounted, setCallback);
        setCallback(response);
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

  return (
    <div>
      {content.map((joke, id) => (
        <div key={id}>
          <p>{joke.id} : {joke.joke}</p>
          <div>
            <Button variant="warning" onClick={() => handleDelete(joke.id)}>Delete joke</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllJokes;

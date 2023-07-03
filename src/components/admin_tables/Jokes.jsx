import React, { useState, useEffect, useRef } from "react";
import apiFacade from "../../apiFacade";
import { Button } from "react-bootstrap";

const Jokes = () => {
  const [content, setContent] = useState();
  const mounted = useRef(true);
  const [currentId, setCurrentId] = useState(1);

  const handleNextId = () => {
    setCurrentId((prevId) => (prevId < 18 ? prevId + 1 : 1));
  };

  const handlePrevId = () => {
    setCurrentId((prevId) => (prevId > 1 ? prevId - 1 : 18));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = apiFacade.getJokeById(setContent, mounted, currentId);
        setContent(response);
        return () => mounted.current = false;
      } catch (error) {
        console.error("Error fetching joke:", error);
      }
    };

    fetchData();
  }, [currentId]);

  if (!content) {
    return "Loading...";
  }

  const { joke } = content;

  return (
    <div>
      <p>{joke}</p>
      <Button variant="success" onClick={handlePrevId}>Prev. joke</Button>
      <Button variant="warning" onClick={handleNextId}>Next joke</Button>
    </div>
  );
};

export default Jokes;

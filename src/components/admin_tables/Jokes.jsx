import React, { useState, useEffect, useRef } from "react";
import apiFacade from "../../apiFacade";
import { Button } from "react-bootstrap";

const Jokes = () => {
  const [content, setContent] = useState();
  const mounted = useRef(true);
  const [currentId, setCurrentId] = useState(1);
  const [callback, setCallback] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleNextId = () => {
    setCurrentId((prevId) => (prevId < 9 ? prevId + 1 : 1));
  };

  const handlePrevId = () => {
    setCurrentId((prevId) => (prevId > 0 ? prevId - 1 : 5));
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFacade.deleteJoke(deleteId, mounted, setCallback);
        setCallback(response);
        return () => mounted.current = false;
      } catch (error) {
        console.log("Error deleting the joke:", error);
      }
    };

    fetchData();
  }, [deleteId]);

  const useDeleteId = () => {
    setDeleteId(currentId);
  };

  if (!content) {
    return (
    <div>
    <p>"Loading..."</p>
    <Button variant="success" onClick={handlePrevId}>Prev. joke</Button>
    <Button variant="warning" onClick={handleNextId}>Next joke</Button>
    </div>
  )}

  const { id, joke, category } = content;

  return (
    <div>
      <p>Id: {currentId} <br /></p>
      <p>Joke: {joke}<br /></p>
      <p>Cat: {category}</p>

      <Button variant="success" onClick={handlePrevId}>Prev. joke</Button>
      <Button variant="warning" onClick={handleNextId}>Next joke</Button>
      <Button variant="warning" onClick={useDeleteId}>Delete joke</Button>
    </div>
  );
};

export default Jokes;

import React, { useState, useEffect, useRef } from "react";
import apiFacade from "../../apiFacade";

const AllJokes = () => {
  const [content, setContent] = useState();
  const mounted = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = apiFacade.getAllJokes(setContent, mounted);
        setContent(response);
        return () => mounted.current = false;
      } catch (error) {
        console.error("Error fetching jokes:", error);
      }
    };

    fetchData();
  }, []);

  if (!content) {
    return "Loading...";
  }

//   const { id, joke } = content;

  return (
    <div>
      {content.map((joke, id) => (
        <p key={id}>{joke.joke}</p>
      ))}
    </div>
  );
};

export default AllJokes;

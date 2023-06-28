import React, { useState, useEffect } from "react";
import apiFacade from "../../apiFacade";

const Jokes = () => {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    let mounted = true;

    apiFacade.getJokeById((response) => {
      console.log("Received joke:", response);
      setJoke(response);
    }, mounted, 3);

    return () => {
      mounted = false;
    };
  }, []);

  if (joke === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {joke.joke}
    </div>
  );
};

export default Jokes;

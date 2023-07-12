import React, { useState } from "react";
import "./App.css";
import ListItem from "./Components/ListItem";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  //

  async function loadingDataHandler() {
    setFetchedData([]);
    setError();
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("OOPS, something went wrong!");
      }

      const data = await response.json();
      const modifiedData = data.results.map((item) => {
        return {
          id: (Math.random() * 100).toFixed(2),
          name: item.title,
          producer: item.producer,
          episode: item.episode_id,
        };
      });
      console.log(modifiedData);
      setIsLoading(false);
      setFetchedData(modifiedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content = <h4>There is no data yet!</h4>;

  if (isLoading) {
    content = <h4 className="loading">Loading...</h4>;
  }
  if (error) {
    content = <h4>{error}</h4>;
  }

  if (fetchedData.length > 0 && !isLoading) {
    content = <ListItem person={fetchedData} />;
  }

  return (
    <div className="App">
      <button onClick={loadingDataHandler}>Load Data</button>
      {content}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import ListItem from "./Components/ListItem";

function App() {
  /**state Management */
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  async function loadingDataHandler() {
    setFetchedData([]);
    setError();
    setIsLoading(true);
    /**use Try and Catch for async function */
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      /**add if statement to Initiate a string as error and jump to catch */
      if (!response.ok) {
        throw new Error("OOPS, something went wrong!");
      }

      const data = await response.json();

      /**Initiate a new variable to store new version of incoming fetched data */
      const modifiedData = data.results.map((item) => {
        return {
          id: (Math.random() * 100).toFixed(2),
          name: item.title,
          producer: item.producer,
          episode: item.episode_id,
        };
      });

      setIsLoading(false);
      setFetchedData(modifiedData);
    } catch (error) {
      setError(error.message);
    }

    /**reset Loading state to false by end of function  */
    setIsLoading(false);
  }

  /**Initiate a new let variable as a content */
  let content = <h4>There is no data yet!</h4>;

  /**In case of Loading  */
  if (isLoading) {
    content = <h4 className="loading">Loading...</h4>;
  }

  /**In case of Error */
  if (error) {
    content = <h4>{error}</h4>;
  }

  /**In case of data fetched completely */
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

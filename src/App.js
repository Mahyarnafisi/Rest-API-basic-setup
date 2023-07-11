import React, { useState } from "react";
import "./App.css";
import ListItem from "./Components/ListItem";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadingDataHandler() {
    setFetchedData([]);
    setError("");
    setLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/film/");
      if (!response.ok) {
        throw new Error("Error, something went wrong!");
      }
      const data = await response.json();
      const modifiedData = data.results.map((item) => {
        return {
          id: (Math.random() * 100).toFixed(2),
          episode: item.episode_id,
          name: item.title,
          producer: item.producer,
        };
      });
      setLoading(false);
      setFetchedData(modifiedData);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }
  let content = <p>no movie found!</p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (loading) {
    content = <p>Loading... </p>;
  }

  if (fetchedData.length > 0) {
    content = <ListItem person={fetchedData} />;
  }

  return (
    <div className="App">
      <button onClick={loadingDataHandler}>Loading Data</button>
      {content}
    </div>
  );
}

export default App;

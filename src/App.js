import React, { useState } from "react";
import "./App.css";
import ListItem from "./Components/ListItem";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function loadingDataHandler() {
    setFetchedData([]);
    setError(false);
    setLoading(true);

    const response = await fetch("https://swapi.dev/api/films/");
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
  }
  console.log(fetchedData);
  return (
    <div className="App">
      <button onClick={loadingDataHandler}>Loading Data</button>
      {loading ? <p>loading</p> : ""}
      {error ? <p>Error</p> : ""}
      <ListItem person={fetchedData} />
    </div>
  );
}

export default App;

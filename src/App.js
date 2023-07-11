import React, { useState } from "react";
import "./App.css";
import ListItem from "./Components/ListItem";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const loadingDataHandler = () => {
    setFetchedData([]);
    setError(false);
    setLoading(true);
    fetch("https://swapi.dev/api/films/")
      .then((response) => response.json())
      .then((data) => {
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
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        return error;
      });
  };
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

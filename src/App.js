import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import ListItem from "./Components/ListItem";
import AddMovie from "./Components/AddMovie";

function App() {
  /**state Management */
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const loadingDataHandler = useCallback(async () => {
    setFetchedData([]);
    setError();
    setIsLoading(true);
    /**use Try and Catch for async function */
    try {
      const response = await fetch("https://codefrombasemenet-default-rtdb.europe-west1.firebasedatabase.app/movies.json");

      /**add if statement to Initiate a string as error and jump to catch */
      if (!response.ok) {
        throw new Error("OOPS, something went wrong!");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          name: data[key].name,
          episode: data[key].episode,
          producer: data[key].producer,
        });
      }

      // /**Initiate a new variable to store new version of incoming fetched data */
      // const modifiedData = data.map((item) => {
      //   return {
      //     name: item.name,
      //     episode: item.episode,
      //     producer: item.producer,
      //   };
      // });

      setIsLoading(false);
      setFetchedData(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    /**reset Loading state to false by end of function  */
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadingDataHandler();
  }, [loadingDataHandler]);

  /**POST new data to firebase database */
  async function addNewMovieHandler(movie) {
    try {
      const response = await fetch("https://codefrombasemenet-default-rtdb.europe-west1.firebasedatabase.app/movies.json", {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Please try again to update your list");
      }
      const data = await response.json();
    } catch (error) {
      setError(error.message);
    }
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

  //-----------------------------------------------------//
  return (
    <div className="App">
      <button onClick={loadingDataHandler}>Load Data</button>
      <AddMovie onAddNewMovie={addNewMovieHandler} />
      {content}
    </div>
  );
}

export default App;

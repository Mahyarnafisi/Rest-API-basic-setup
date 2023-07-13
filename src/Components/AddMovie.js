import React, { useState, useRef, useCallback } from "react";

function AddMovie(props) {
  const titleRef = useRef();
  const episodeRef = useRef();
  const producerRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const addedMovie = {
      id: Number((Math.random() * 100).toFixed(2)),
      name: titleRef.current.value,
      episode: episodeRef.current.value,
      producer: producerRef.current.value,
    };
    props.onAddNewMovie(addedMovie);
    titleRef.current.value = "";
    episodeRef.current.value = "";
    producerRef.current.value = "";
  };

  return (
    <div className="add-movie">
      <form className="form" onSubmit={submitHandler}>
        <div className="form__section">
          <label htmlFor="movieName">Movie Name</label>
          <input type="text" id="movieName" ref={titleRef} placeholder="Movie name" />
        </div>
        <div className="form__section">
          <label htmlFor="episode">Episode</label>
          <input type="text" id="episode" ref={episodeRef} placeholder="Episode number" />
        </div>
        <div className="form__section">
          <label htmlFor="producer">Producer:</label>
          <input type="text" id="producer" ref={producerRef} placeholder="Producer" />
        </div>
        <button type="submit" className="btn-submit">
          Add your movie
        </button>
      </form>
    </div>
  );
}

export default AddMovie;

import React, { useState, useRef } from "react";

function AddMovie(props) {
  const titleRef = useRef();
  const episodeRef = useRef();
  const producerRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    /**validation on inputs */
    if (titleRef.current.value.length === 0 || episodeRef.current.value.length === 0 || producerRef.current.value.length === 0) {
      return;
    } else {
      /**create ene object with unique ID will add with Firebase automatically */
      const addedMovie = {
        name: titleRef.current.value,
        episode: episodeRef.current.value,
        producer: producerRef.current.value,
      };
      /**sending new object up */
      props.onAddNewMovie(addedMovie);
      /**resting the inputs */
      titleRef.current.value = "";
      episodeRef.current.value = "";
      producerRef.current.value = "";
    }
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

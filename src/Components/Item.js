import React from "react";

const Item = (props) => {
  const data = props.person.map((num) => {
    return {
      episode: num.episode,
    };
  });
  const numList = data.map((episode) => {
    return episode.episode;
  });

  return (
    <div className="item">
      {props.person.map((item) => {
        return (
          <div className="list-item" key={item.id}>
            <h4>{item.episode}</h4>
            <h1>{item.name}</h1>
            <h2>{item.producer}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Item;

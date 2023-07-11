import React from "react";

const Item = (props) => {
  return (
    <div className="item">
      {props.person.map((item) => {
        return (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <h2>{item.producer}</h2>
            <h4>{item.episode}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Item;

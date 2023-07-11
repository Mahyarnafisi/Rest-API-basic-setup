import React from "react";
import Item from "./Item";

const ListItem = (props) => {
  return (
    <div>
      <Item person={props.person} />
    </div>
  );
};

export default ListItem;

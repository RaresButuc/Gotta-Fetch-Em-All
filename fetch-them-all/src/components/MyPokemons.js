import React from "react";

const MyPokemons = ({ name, photo }) => {
  return (
    <div>
      <h2>{name}</h2>
      <img src={photo} alt="" /><br></br>
      <input type = 'radio'></input>
    </div>
  );
};

export default MyPokemons;
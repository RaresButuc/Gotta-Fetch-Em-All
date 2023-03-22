import React from "react";

const MyPokemonStats = ({ name, photo, hp, attack, defense }) => {
  return (
    <div className="myPokemonStats">
      <h2>{name}</h2>
      <img src={photo} alt="" /><br></br>
      <h4>HP: {hp}</h4>
      <h4>Attack: {attack}</h4>
      <h4>Defense: {defense}</h4>
    </div>
  );
};

export default MyPokemonStats;
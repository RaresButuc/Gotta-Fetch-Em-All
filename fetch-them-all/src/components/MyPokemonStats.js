import React from "react";

const MyPokemonStats = ({ name, photo, hp, attack, deffense }) => {
  return (
    <div className="myOwnPokemon">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img src={photo} alt="" /><br></br>
      <h4>HP: {hp}</h4>
      <h4>Attack: {attack}</h4>
      <h4>Deffense: {deffense}</h4>
    </div>
  );
};

export default MyPokemonStats;
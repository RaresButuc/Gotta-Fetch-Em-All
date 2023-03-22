import React from "react";

const PokeData = ({ name, photo, hp, attack, deffense, onBack }) => {
  return (
    <div className="pokemons">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img src={photo} alt="" />
      <h4>HP: {hp}</h4>
      <h4>Attack: {attack}</h4>
      <h4>Deffense: {deffense}</h4><br></br>
      <button onClick={onBack} className = 'backButton'>Back</button>
    </div>
  );
};

export default PokeData;
import React from "react";

const PokeData = ({ name, photo, onBack }) => {
  return (
    <div>
      <h2>{name}</h2>
      <img src={photo} alt="" /><br></br>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default PokeData;
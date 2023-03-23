import React from "react";

function BackToLocations({ getBack }) {
  return (
    <div>
      <button onClick = {getBack}>Back to Locations</button>
    </div>
  );
}

export default BackToLocations;
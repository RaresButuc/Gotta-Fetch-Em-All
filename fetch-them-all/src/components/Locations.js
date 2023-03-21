import React from "react";

function Locations({ locationsNames, showInfos }) {
  return (
    <div>
      {locationsNames.map((location) => (
        <div key={location.name}>
          <h2 className="locationNames" onClick={() => showInfos(location)}>
            {location.name}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default Locations;
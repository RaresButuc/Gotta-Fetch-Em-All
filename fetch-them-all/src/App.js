import "./App.css";
import React, { useState, useEffect } from "react";
import Locations from "./components/Locations";

function App() {
  let [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await fetch("https://pokeapi.co/api/v2/location");
        const locations = await info.json();
        setData(locations.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
       {data.map((location) => (
      <Locations props={location.name}/>
        ))}
    </div>
  );
}

export default App;
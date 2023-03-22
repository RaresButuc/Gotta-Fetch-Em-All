import "./App.css";
import React, { useState, useEffect } from "react";
import Locations from "./components/Locations";
import PokeData from "./components/PokeData";
import MyPokemons from "./components/MyPokemons";
import MyPokemonStats from "./components/MyPokemonStats";

function App() {
  //Show Locations
  let [locations, setLocations] = useState([]);
  //On page or Not
  const [onPage, setOnPage] = useState(false);
  //Selected Location
  const [selectedLocation, setSelectedLocation] = useState(null);
  //Selected Location FLink
  const [selectedLocationFirstLink, setSelectedLocationFirstLink] =
    useState(null);
  //Selected Location SLink
  const [selectedLocationSecondLink, setSelectedLocationSecondLink] =
    useState(null);
  //Encountered Pokemon Name
  const [randomPokemonName, setRandomPokemonName] = useState(".");
  //Accesing Main Link
  const [mainLink, setMainLink] = useState(null);
  //Encountered Pokemon Image
  const [randomPokemonImage, setRandomPokemonImage] = useState(null);
  //Encountered Pokemon Stats
  // const [hpEncountered, setHpEncountered] = useState(null);
  // const [attackEncountered, setAttackEncountered] = useState(null);
  // const [defenseEncountered, setDefenseEncountered] = useState(null);

  const [encounteredPokemonStats, setEncounteredPokemonStats] = useState(null);

  //My Pokemon Informations: Name and Photo
  const [ownedPokemonData, setOwnedPokemonData] = useState(null);
  //Chosen Pokemon
  const [chosenPokemon, setChosenPokemon] = useState(null);
  // const [chosenOrNot, setChosenOrNot] = useState(null);
  const [statsChosenPokemon, setStatsChosenPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await fetch("https://pokeapi.co/api/v2/location");
        const locations = await info.json();
        setLocations(locations.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleBack = () => {
    setOnPage(false);
    setSelectedLocation(null);
    setSelectedLocationFirstLink(null);
    setSelectedLocationSecondLink(null);
    setRandomPokemonName(".");
    setRandomPokemonImage(null);
    setChosenPokemon(null);
    setStatsChosenPokemon(null);
  };

  //Showing Pokemon Details

  function handleLocationDetails(location) {
    setOnPage(true);
    setSelectedLocation(location);
    //First URL
    const linkLocation = location.url;
    setSelectedLocationFirstLink(linkLocation);
  }

  //Accesing the first URL
  useEffect(() => {
    async function fetchData() {
      try {
        const info = await fetch(selectedLocationFirstLink);
        const firstLink = await info.json();
        let randomArea = Math.floor(Math.random() * firstLink.areas.length);
        setSelectedLocationSecondLink(firstLink.areas[randomArea].url);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [selectedLocationFirstLink]);

  //Accesing the second URL and getting Pokemon name and first URL link to Image
  useEffect(() => {
    async function fetchData() {
      try {
        const info = await fetch(selectedLocationSecondLink);
        const secondLink = await info.json();
        let randomName = Math.floor(
          Math.random() * secondLink.pokemon_encounters.length
        );
        setRandomPokemonName(
          secondLink.pokemon_encounters[randomName].pokemon.name
        );
        setMainLink(secondLink.pokemon_encounters[randomName].pokemon.url);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [selectedLocationSecondLink]);

  //Encountered Pokemon Stats
  useEffect(() => {
    async function fetchData() {
      try {
        const info = await fetch(mainLink);
        const mainLinkPokemon = await info.json();
        const stats = {
          photo: mainLinkPokemon.sprites.other.dream_world.front_default,
          hp: mainLinkPokemon.stats[0].base_stat,
          attack: mainLinkPokemon.stats[1].base_stat,
          defense: mainLinkPokemon.stats[2].base_stat,
        };
        setEncounteredPokemonStats(stats);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [mainLink]);

  //My own Pokemons
  const usersPokemon = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl",
  ];

  //Getting the names and photos of my pokemons
  useEffect(() => {
    const getPokeInfo = async () => {
      const myPokemonInfos = [];
      for (const pokeApi of usersPokemon) {
        const info = await fetch(pokeApi);
        const data = await info.json();
        myPokemonInfos.push({
          name: data.forms[0].name,
          photoSmall: data.sprites.front_default,
          photoBig: data.sprites.other.dream_world.front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
        });
      }
      setOwnedPokemonData(myPokemonInfos);
    };
    getPokeInfo();
  }, []);

  //Choosing my Pokemon
  const choosingMyPokemon = (event) => {
    setStatsChosenPokemon(
      ownedPokemonData.filter((pokemon) => pokemon.name === event.target.value)
    );
  };

  return (
    <div className="App">
      {onPage ? (
        <div>
          {ownedPokemonData.map((pokemon) => (
            <MyPokemons
              name={pokemon.name}
              photo={pokemon.photoSmall}
              onUse={choosingMyPokemon}
            />
          ))}

          {encounteredPokemonStats && (
            <PokeData
              name={
                randomPokemonName
                  ? randomPokemonName
                  : "This location doesn't seem to have any pokémon"
              }
              photo={encounteredPokemonStats.photo}
              hp={encounteredPokemonStats.hp}
              attack={encounteredPokemonStats.attack}
              defense={encounteredPokemonStats.defense}
              // onBack={handleBack}
            />
          )}

          {statsChosenPokemon && (
            <MyPokemonStats
              name={
                statsChosenPokemon[0].name.charAt(0).toUpperCase() +
                statsChosenPokemon[0].name.slice(1)
              }
              photo={statsChosenPokemon[0].photoBig}
              hp={statsChosenPokemon[0].hp}
              attack={statsChosenPokemon[0].attack}
              defense={statsChosenPokemon[0].defense}
            />
          )}
        </div>
      ) : (
        <Locations
          locationsNames={locations}
          showInfos={handleLocationDetails}
        />
      )}
    </div>
  );
}

export default App;
import "./App.css";
import React, { useState, useEffect } from "react";
import Locations from "./components/Locations";
import PokeData from "./components/PokeData";
import MyPokemons from "./components/MyPokemons";

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
  //Pokemon Name
  const [randomPokemonName, setRandomPokemonName] = useState(".");
  //Pokemon Image
  const [randomPokemonImageFirstLink, setRandomPokemonImageFirstLink] =
    useState(null);
  const [randomPokemonImage, setRandomPokemonImage] = useState(null);
  //My Pokemon Informations: Name and Photo
  const [ownedPokemonData, setOwnedPokemonData] = useState(null);
  //Chosen Pokemon
  const [chosenPokemon, setChosenPokemon] = useState(null);

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
    setChosenPokemon(null)
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
        // console.log(randomArea);
        setSelectedLocationSecondLink(firstLink.areas[randomArea].url);
        // console.log(firstLink);
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
        // console.log(secondLink);
        setRandomPokemonName(
          secondLink.pokemon_encounters[randomName].pokemon.name
        );
        setRandomPokemonImageFirstLink(
          secondLink.pokemon_encounters[randomName].pokemon.url
        );
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [selectedLocationSecondLink]);

  //Accesing the second URL for Image
  useEffect(() => {
    async function fetchData() {
      try {
        const info = await fetch(randomPokemonImageFirstLink);
        const imageLink = await info.json();
        setRandomPokemonImage(
          imageLink.sprites.other.dream_world.front_default
          // imageLink.sprites.front_default
        );
        // console.log(secondLink);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [randomPokemonImageFirstLink]);

  //My own Pokemons
  const usersPokemon = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl",
  ];

  useEffect(() => {
    // const myPokemonInfos = [];
    const getPokeInfo = async () => {
      const myPokemonInfos = [];
      for (const pokeApi of usersPokemon) {
        const info = await fetch(pokeApi);
        const data = await info.json();
        myPokemonInfos.push({
          name: data.forms[0].name,
          photo: data.sprites.front_default,
        });
        // console.log(myPokemonInfos);
      }
      setOwnedPokemonData(myPokemonInfos);
      // console.log(myPokemonInfos)
    };
    getPokeInfo();
  }, []);
  // console.log(myPokemonInfos);

  //Saving My Pokemon Names
  // const myPokemonsNames = () => {
  //   const names = usersPokemon.map(name => name.split('/').slice(-1).join(','))
  //   setOwnedPokemonNames(names)
  // }

  //Choosing my Pokemon
  const choosingMyPokemon = event => {
    console.log(event.target.value)
    setChosenPokemon("https://pokeapi.co/api/v2/pokemon/" + event.target.value)
  };
  console.log(chosenPokemon)

  return (
    <div className="App">
      {onPage ? (
        <div>
          {ownedPokemonData.map((pokemon) => (
            <MyPokemons
              name={pokemon.name}
              photo={pokemon.photo}
              onUse={choosingMyPokemon}
            />
          ))}

          <PokeData
            name={
              randomPokemonName
                ? randomPokemonName
                : "This location doesn't seem to have any pokémon"
            }
            photo={randomPokemonImage}
            onBack={handleBack}
          />
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
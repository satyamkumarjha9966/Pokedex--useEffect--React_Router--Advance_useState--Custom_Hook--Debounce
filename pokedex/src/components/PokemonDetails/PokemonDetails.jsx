import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';


function PokemonDetails() {
  const {id} = useParams();
  const [pokemon, setPokemon] = useState({});

  async function pokemonDownload() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    console.log(response.data);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name)
    })
    
  }

  useEffect(() => {
    pokemonDownload();
  }, []);
  
  return (
    <div className="pokemon_details_wrapper">
      <img className="pokemon_details_image" src={pokemon.image} alt={pokemon.name} />
      <div className="pokemons_details_name">{pokemon.name}</div>
      <div className="pokemons_details_weight">Weight: {pokemon.weight}</div>
      <div className="pokemons_details_height">Height: {pokemon.height}</div>
      <div className="pokemons_details_types">
      {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
      </div>
    </div>
  )
}

export default PokemonDetails;
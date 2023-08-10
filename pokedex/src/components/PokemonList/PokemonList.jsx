import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon/';

    async function downloadPokemons() {
        // This downloads list of 20 pokemons
        const response = await axios.get(POKEDEX_URL)
        // We get the array of pokemon from results
        const pokemonResults = response.data.results;
        // Iterating over the array of pokemons, and using their URL, to create an array of promises, that will download those 20 pokemons
        const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        // Passing the promise array to axios.all
        // array of 20 pokemons details data
        const pokemonData = await axios.all(pokemonResultsPromise);
        // Now iterate on the data of each pokemon, and extract id, name, image, types
        const pokeListResult = (pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return{
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
            
        }));
        setPokemonList(pokeListResult);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [])

  return (
    <div className="pokeman_list_wrapper">
        <div className="pokemon_wrapper">
            {(isLoading) 
            ? 'Loading....' 
            : pokemonList.map((p) => <Pokemon name={p.name} url={p.image} id={p.id} />)
            }
        </div>

        <div className="controllers">
            <button>Prev</button>
            <button>Next</button>
        </div>
    </div>
  )
}

export default PokemonList;
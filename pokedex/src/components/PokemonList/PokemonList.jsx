import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function downloadPokemons() {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/')
        const pokemonResults = response.data.results;
        const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultsPromise);
        const res = (pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return{
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
                
            }
            
        }));
        setPokemonList(res);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [])

  return (
    <div className="pokeman_list_wrapper">
        <div>Pokemon List</div>
        {(isLoading) 
        ? 'Loading....' 
        : pokemonList.map((p) => <Pokemon name={p.name} url={p.image} id={p.id} />)
        }
    </div>
  )
}

export default PokemonList;
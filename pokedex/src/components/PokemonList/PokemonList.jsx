import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon/',
        nextUrl: '',
        prevUrl: ''
    })

    async function downloadPokemons() {

        // setIsLoading(true)
        setPokemonListState({...pokemonListState, isLoading: true});


        // This downloads list of 20 pokemons
        const response = await axios.get(pokemonListState.pokedexUrl)

        // We get the array of pokemon from results
        const pokemonResults = response.data.results;
        console.log(response.data);
        setPokemonListState({...pokemonListState, nextUrl: response.data.next, prevUrl: response.data.previous});
        // setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);

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
        setPokemonListState({...pokemonListState, pokemonList: pokeListResult});
        setPokemonListState({...pokemonListState, isLoading: false});
        // setPokemonList(pokeListResult);
        // setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokedexUrl])

  return (
    <div className="pokeman_list_wrapper">
        <div className="pokemon_wrapper">
            {(isLoading) 
            ? 'Loading....' 
            : pokemonList.map((p) => <Pokemon name={p.name} url={p.image} key={p.id} id={p.id} />)
            }
        </div>

        <div className="controllers">
            <button disabled={prevUrl == null} onClick={() => setPokedexUrl(prevUrl)} >Prev</button>
            <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)} >Next</button>
        </div>
    </div>
  )
}

export default PokemonList;
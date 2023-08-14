import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon/",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
      // setIsLoading(true)
      setPokemonListState((state) => ({ ...state, isLoading: true }));

      // This downloads list of 20 pokemons
      const response = await axios.get(pokemonListState.pokedexUrl);

      // We get the array of pokemon from results
      const pokemonResults = response.data.results;
      console.log(response.data);
      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));

      const pokemonResultsPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );

      // Passing the promise array to axios.all
      // array of 20 pokemons details data
      const pokemonData = await axios.all(pokemonResultsPromise);

      // Now iterate on the data of each pokemon, and extract id, name, image, types
      const pokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other.dream_world.front_default,
          types: pokemon.types,
        };
      });
      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokeListResult,
        isLoading: false,
      }));
      // setPokemonList(pokeListResult);
      // setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return { pokemonListState, setPokemonListState };
}

export default usePokemonList;

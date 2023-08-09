import { useEffect } from "react";
import axios from 'axios';

function PokemonList() {

    async function downloadPokemons() {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/')
        console.log(response.data); 
    }

    useEffect(async () => {
        downloadPokemons();
    }, [])

  return (
    <div className="pokeman_list_wrapper">
        Pokemon List 
    </div>
  )
}

export default PokemonList;
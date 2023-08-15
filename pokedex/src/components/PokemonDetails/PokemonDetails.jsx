import { useParams } from "react-router-dom";
import './PokemonDetails.css';
import usePokemonDetails from "../../hooks/usePokemonDetails";

function PokemonDetails({pokemonName}) {
  const {id} = useParams();
  const [pokemon] = usePokemonDetails(id, pokemonName);
  
  return (
    <div className="pokemon_details_wrapper">
      <img className="pokemon_details_image" src={pokemon.image} alt={pokemon.name} />
      <div className="pokemons_details_name">{pokemon.name}</div>
      <div className="pokemons_details_weight">Weight: {pokemon.weight}</div>
      <div className="pokemons_details_height">Height: {pokemon.height}</div>
      <div className="pokemons_details_types">
      {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
      </div>

      {pokemon.types && pokemon.similarPokemons &&
        <div>
          <h2>More <span>{pokemon.types[0]}</span> Type Pokemons:</h2>
          <ul>
            {pokemon.similarPokemons.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
          </ul>
        </div>
      }
    </div>
  )
}

export default PokemonDetails;
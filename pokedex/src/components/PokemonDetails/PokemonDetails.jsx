import { useParams } from "react-router-dom";
import './PokemonDetails.css';
import usePokemonDetails from "../../hooks/usePokemonDetails";

function PokemonDetails() {
  const {id} = useParams();
  const [pokemon] = usePokemonDetails(id);
  
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
          More {pokemon.types[0]} Type Pokemons
          <ul>
            {pokemon.similarPokemons.map((p) => <li key={p.pokemon.id}>{p.pokemon.name}</li>)}
          </ul>
        </div>
      }
    </div>
  )
}

export default PokemonDetails;
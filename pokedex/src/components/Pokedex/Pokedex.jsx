import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './Pokedex.css';

function Pokedex() {
  return (
    <div className="pokedex_wrapper">
        <h1 id="pokedex_heading">POKEDEX</h1>
        <Search />
        <PokemonList />
    </div>
  )
}

export default Pokedex
import useDebounce from '../../hooks/useDebounce';
import './Search.css';

function Search({updateSearchTerm}) {
    const debouncedCallback = useDebounce((e) => updateSearchTerm(e.target.value))
    return(
        <div className="search_wrapper">
            <input 
            id="pokemon_name_search"
            type="text"
            placeholder="Pokemon Name....."
            onChange={debouncedCallback}
            />
        </div>
    );
}

export default Search;
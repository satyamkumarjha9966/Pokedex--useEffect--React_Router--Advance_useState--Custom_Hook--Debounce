import './Search.css';

function Search() {
    return(
        <div className="search_wrapper">
            <input 
            id="pokemon_name_search"
            type="text"
            placeholder="Pokemon Name....."
            />
        </div>
    );
}

export default Search;
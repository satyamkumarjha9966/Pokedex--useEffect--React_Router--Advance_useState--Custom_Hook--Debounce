import { Link } from 'react-router-dom';
import './Pokemon.css';

function Pokemon({name, url, id}) {
  return (
    <div className='pokemon'>
      <Link to={`/pokemon/${id}`}>
        <div className='pokemon_name'>{name}</div>
        <div>
          <img className='pokemon_img' src={url} alt={name} />
        </div>
      </Link>
    </div>
  )
}

export default Pokemon;

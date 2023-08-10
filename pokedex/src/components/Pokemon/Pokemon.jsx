import './Pokemon.css';

function Pokemon({name, url}) {
  return (
    <div className='pokemon'>
        <div className='pokemon_name'>{name}</div>
        <div>
          <img className='pokemon_img' src={url} alt={name} />
        </div>
    </div>
  )
}

export default Pokemon;

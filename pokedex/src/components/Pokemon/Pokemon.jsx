
function Pokemon({name, url}) {
  return (
    <>
        <div>{name}</div>
        <div><img src={url} alt={name} /></div>
    </>
  )
}

export default Pokemon
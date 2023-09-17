import "./Search.css"

function Search({ busqueda, setBusqueda, buscarPokemon }) {
    return (
<>
<form className="search-container" onSubmit={buscarPokemon}>
    <input type="text" placeholder="Buscar Pokemon" className="search-input" value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}/>
    <button className="search-btn"><i className='bx bx-search'></i></button>
</form>
</>
    )
};

export default Search;
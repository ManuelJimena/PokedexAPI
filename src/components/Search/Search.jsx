import "./Search.css";

// El componente Search recibe tres propiedades desde el componente que lo invoca
function Search({ busqueda, setBusqueda, buscarPokemon }) {
  return (
    <>
      {/* La etiqueta form contiene el campo de búsqueda y un botón de envío */}
      <form className="search-container" onSubmit={buscarPokemon}>
        <input
          type="text"
          placeholder="Buscar Pokemon"
          className="search-input"
          value={busqueda}
          // Cuando cambia el valor del campo de búsqueda, se actualiza el estado correspondiente
          onChange={(e) => setBusqueda(e.target.value)} 
        />
        <button className="search-btn">
          <i className="bx bx-search"></i>
        </button>
      </form>
    </>
  );
}

export default Search;
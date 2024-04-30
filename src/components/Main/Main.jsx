import "./Main.css";
import usePokemons from "../../hooks/usePokemons";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../Cards/Cards";
import Search from "../Search/Search";
import { useState } from "react";

// Componente que representa un Pokémon individual
function Pokemon({ id, nombre, imagen, altura, peso, tipos, verPokemon }) {
  // Renderiza la información de un Pokémon y maneja el evento onClick para mostrar la tarjeta individual.
  return (
    <div className="pokemons" key={id} onClick={verPokemon}>
      {/* Muestra el número de ID del Pokémon */}
      <p className="pokemon-id-back">#{id}</p>
      {/* Muestra la imagen del Pokémon */}
      <div className="pokemon-imagen">
        <img src={imagen} alt={nombre} />
      </div>
      <div className="pokemon-info">
        {/* Muestra el nombre del Pokémon */}
        <div className="nombre-contenedor">
          <p className="pokemon-id">#{id}</p>
          <h2 className="pokemon-nombre">{nombre}</h2>
        </div>
        {/* Muestra los tipos del Pokémon */}
        <div className="pokemon-tipos">
          {tipos.map((tipo, index) => (
            <p key={id + index} className={tipo} id="tipos">
              {tipo}
            </p>
          ))}
        </div>
        {/* Muestra la altura y peso del Pokémon */}
        <div className="pokemon-stats">
          <p className="stat">
            {altura >= 10
              ? `${(altura / 10).toFixed(2)}m`
              : `${altura}0cm`}
          </p>
          <p className="stat">{peso / 10}kg</p>
        </div>
      </div>
      <div onClick={verPokemon}></div>
    </div>
  );
}

// Componente principal que representa la página principal
const Main = () => {
  // Utiliza el hook personalizado usePokemons para obtener datos de Pokémon y funciones relacionadas.
  const { pokemons, masPokemons, verMas, searchPokemon, filtrarPorTipo, tipoSeleccionado, endOfList, setEndOfList } =
    usePokemons();
  // Estado para controlar la visualización de la tarjeta de Pokémon individual y los resultados de búsqueda.
  const [mostrar, setMostrar] = useState({ mostrar: false, pokemon: {} });
  // Estado para almacenar la búsqueda del usuario.
  const [busqueda, setBusqueda] = useState("");

  // Función para mostrar un Pokémon individual.
  const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon });
  // Función para ocultar la tarjeta de Pokémon individual y limpiar la búsqueda.
  const noVerPokemon = () => {
    setMostrar({ mostrar: false, pokemon: {} });
    setBusqueda("");
  };

  // Función para buscar un Pokémon.
  const buscarPokemon = async (e) => {
    e.preventDefault();

    if (!busqueda) return;

    const pokemon = await searchPokemon(busqueda);
    setMostrar({ mostrar: true, pokemon });
  };

  return (
    <main translate="no">
      {/* Componente Cards para mostrar la tarjeta de Pokémon individual */}
      <Cards {...mostrar} cerrar={noVerPokemon} />
      <div>
        <nav className="nav">
          <ul className="nav-list">
            {/* Botones para filtrar Pokémon por tipo */}
            <li><button className={`all pokemon${tipoSeleccionado === "all pokemon" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("all pokemon")}>all pokemon</button></li>
            <li><button className={`grass${tipoSeleccionado === "grass" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("grass")}>grass</button></li>
            <li><button className={`fire${tipoSeleccionado === "fire" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("fire")}>fire</button></li>
            <li><button className={`water${tipoSeleccionado === "water" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("water")}>water</button></li>
            <li><button className={`electric${tipoSeleccionado === "electric" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("electric")}>electric</button></li>
            <li><button className={`ice${tipoSeleccionado === "ice" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("ice")}>ice</button></li>
            <li><button className={`fighting${tipoSeleccionado === "fighting" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("fighting")}>fighting</button></li>
            <li><button className={`poison${tipoSeleccionado === "poison" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("poison")}>poison</button></li>
            <li><button className={`ground${tipoSeleccionado === "ground" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("ground")}>ground</button></li>
            <li><button className={`flying${tipoSeleccionado === "flying" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("flying")}>flying</button></li>
            <li><button className={`psychic${tipoSeleccionado === "psychic" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("psychic")}>psychic</button></li>
            <li><button className={`bug${tipoSeleccionado === "bug" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("bug")}>bug</button></li>
            <li><button className={`rock${tipoSeleccionado === "rock" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("rock")}>rock</button></li>
            <li><button className={`ghost${tipoSeleccionado === "ghost" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("ghost")}>ghost</button></li>
            <li><button className={`dragon${tipoSeleccionado === "dragon" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("dragon")}>dragon</button></li>
            <li><button className={`dark${tipoSeleccionado === "dark" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("dark")}>dark</button></li>
            <li><button className={`steel${tipoSeleccionado === "steel" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("steel")}>steel</button></li>
            <li><button className={`fairy${tipoSeleccionado === "fairy" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("fairy")}>fairy</button></li>
            <li><button className={`normal${tipoSeleccionado === "normal" ? " selected" : ""}`}
                onClick={() => filtrarPorTipo("normal")}>normal</button></li>
          </ul>
        </nav>
      </div>
      {/* Componente Search para buscar Pokémon */}
      <Search
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        buscarPokemon={buscarPokemon}/>
      <section id="todos">
        {/* Componente InfiniteScroll para cargar más Pokémon al desplazarse */}
        <InfiniteScroll
  dataLength={pokemons.length}
  next={masPokemons}
  hasMore={verMas && !endOfList} // Verificación de endOfList aquí.
  loader={<img className="spinner" src="https://c.tenor.com/2lFt6lp1KaMAAAAi/run-pokemon.gif" alt="pikachu"></img>}
  endMessage={
    endOfList && (
      <img className="endpokemon" src="https://res.cloudinary.com/dhjmt9vvq/image/upload/v1695665115/Gotta_kjzkhu.png" alt="End of List"></img>
    )
  }
>
  <div className="pokemon-todos" id="listaPokemon">
    {pokemons.map((pokemon) => (
      <Pokemon
        key={pokemon.id}
        {...pokemon}
        verPokemon={() => verPokemon(pokemon)}
      />
    ))}
  </div>
</InfiniteScroll>
      </section>
    </main>
  );
};

export default Main;

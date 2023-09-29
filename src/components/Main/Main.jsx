import "./Main.css";
import usePokemons from "../../hooks/usePokemons";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../Cards/Cards";
import Search from "../Search/Search";
import { useState } from 'react';

function Pokemon({ id, nombre, imagen, altura, peso, tipos, verPokemon }) {
  return (
    <div className="pokemons" key={id} onClick={verPokemon}>
      {/* Muestra el número de ID del Pokemon */}
      <p className="pokemon-id-back">#{id}</p>
      {/* Muestra la imagen del Pokemon */}
      <div className="pokemon-imagen">
        <img src={imagen} alt={nombre} />
      </div>
      <div className="pokemon-info">
        {/* Muestra el nombre del Pokemon */}
        <div className="nombre-contenedor">
          <p className="pokemon-id">#{id}</p>
          <h2 className="pokemon-nombre">{nombre}</h2>
        </div>
        {/* Muestra los tipos de Pokemon */}
        <div className="pokemon-tipos">
          {tipos.map((tipo, index) => (
            <p key={index} className={tipo} id="tipos">
              {tipo}
            </p>
          ))}
        </div>
        {/* Muestra la altura y peso del Pokemon */}
        <div className="pokemon-stats">
          <p className="stat">
            {altura >= 10
              ? `${(altura / 10).toFixed(2)}m`
              : `${altura}0cm`}
          </p>
          <p className="stat">{peso / 10}kg</p>
        </div>
      </div>
    </div>
  );
}

const Main = () => {
  // Usa el custom hook usePokemons para obtener la lista de Pokemons y otras funciones de ayuda
  const { pokemons, masPokemons, verMas, searchPokemon } = usePokemons();
  // Define el estado mostrar y pokemon para controlar la apertura/cierre del modal con los detalles del Pokemon
  const [mostrar, setMostrar] = useState({ mostrar: false, pokemon: {} });
  // Define el estado busqueda para controlar la cadena de búsqueda del campo de búsqueda
  const [busqueda, setBusqueda] = useState('');
  // Define el estado tipoSeleccionado para controlar el tipo de Pokemon seleccionado en el menú de navegación
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon }); // Abre el modal con los detalles del Pokemon
  const noVerPokemon = () => {
    setMostrar({ mostrar: false, pokemon: {} }); // Cierra el modal con los detalles del Pokemon
    setBusqueda(''); // Borra la cadena de búsqueda del campo de búsqueda
  };

  const buscarPokemon = async (e) => {
    e.preventDefault();

    if (!busqueda) return;

    const pokemon = await searchPokemon(busqueda); // Busca el Pokemon con la cadena de búsqueda
    setMostrar({ mostrar: true, pokemon }); // Abre el modal con los detalles del Pokemon encontrado
  };

  const pokemonsFiltrados = tipoSeleccionado !== ""
    ? pokemons.filter(pokemon => pokemon.tipos.includes(tipoSeleccionado)) // Filtra los Pokemons según el tipo seleccionado en el menú de navegación
    : pokemons; // Si no se ha seleccionado ningún tipo, muestra todos los Pokemons

  return (
    <main translate="no">
      <Cards {...mostrar} cerrar={noVerPokemon} />
      <div>
        <nav className="nav">
          <ul className="nav-list">
            {/* Muestra los botones con los distintos tipos de Pokemon. Al hacer clic en cada botón, se filtran los Pokemons */}
            <li><button className="all pokemon" onClick={() => setTipoSeleccionado("")}>all pokemon</button></li>
            <li><button className="grass" onClick={() => setTipoSeleccionado("grass")}>grass</button></li>
            <li><button className="fire" onClick={() => setTipoSeleccionado("fire")}>fire</button></li>
            <li><button className="water" onClick={() => setTipoSeleccionado("water")}>water</button></li>
            <li><button className="electric" onClick={() => setTipoSeleccionado("electric")}>electric</button></li>
            <li><button className="ice" onClick={() => setTipoSeleccionado("ice")}>ice</button></li>
            <li><button className="fighting" onClick={() => setTipoSeleccionado("fighting")}>fighting</button></li>
            <li><button className="poison" onClick={() => setTipoSeleccionado("poison")}>poison</button></li>
            <li><button className="ground" onClick={() => setTipoSeleccionado("ground")}>ground</button></li>
            <li><button className="flying" onClick={() => setTipoSeleccionado("flying")}>flying</button></li>
            <li><button className="psychic" onClick={() => setTipoSeleccionado("psychic")}>psychic</button></li>
            <li><button className="bug" onClick={() => setTipoSeleccionado("bug")}>bug</button></li>
            <li><button className="rock" onClick={() => setTipoSeleccionado("rock")}>rock</button></li>
            <li><button className="ghost" onClick={() => setTipoSeleccionado("ghost")}>ghost</button></li>
            <li><button className="dragon" onClick={() => setTipoSeleccionado("dragon")}>dragon</button></li>
            <li><button className="dark" onClick={() => setTipoSeleccionado("dark")}>dark</button></li>
            <li><button className="steel" onClick={() => setTipoSeleccionado("steel")}>steel</button></li>
            <li><button className="fairy" onClick={() => setTipoSeleccionado("fairy")}>fairy</button></li>
            <li><button className="normal" onClick={() => setTipoSeleccionado("normal")}>normal</button></li>
          </ul>
        </nav>
      </div>
      {/* Muestra el campo de búsqueda para buscar un Pokemon por nombre */}
      <Search busqueda={busqueda} setBusqueda={setBusqueda} buscarPokemon={buscarPokemon} />
      <section id="todos">
        {/* Muestra la lista de Pokemons con scrolling infinito */}
        <InfiniteScroll
          dataLength={pokemonsFiltrados.length}
          next={masPokemons}
          hasMore={verMas}
          loader={<img className="spinner" src="https://c.tenor.com/2lFt6lp1KaMAAAAi/run-pokemon.gif" alt="pikachu"></img>}
          endMessage={<img className="endpokemon" src="https://res.cloudinary.com/dhjmt9vvq/image/upload/v1695665115/Gotta_kjzkhu.png"></img>}
        >
          <div className="pokemon-todos" id="listaPokemon">
            {pokemonsFiltrados.map(pokemon => <Pokemon {...pokemon} key={pokemon.id} verPokemon={() => verPokemon(pokemon)} />)}
          </div>
        </InfiniteScroll>
      </section>
    </main>
  );
}

export default Main;
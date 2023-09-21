import "./Main.css"
import usePokemons from "../../hooks/usePokemons"
import InfiniteScroll from "react-infinite-scroll-component"
import Cards from "../Cards/Cards"
import Search from "../Search/Search"
import { useState } from 'react';

function Pokemon({id, nombre, imagen, altura, peso, tipos, verPokemon}) {
    return (
        <div className="pokemons" key={id} onClick={verPokemon}>
            <p className="pokemon-id-back">#{id}</p>
            <div className="pokemon-imagen">
                <img src={imagen} alt={nombre}/>
            </div>
            <div className="pokemon-info">
                <div className="nombre-contenedor">
                    <p className="pokemon-id">#{id}</p>
                    <h2 className="pokemon-nombre">{nombre}</h2>
                </div>
                <div className="pokemon-tipos">
          {tipos.map((tipo, index) => (
            <p key={index} className={tipo} id="tipos">
              {tipo}
            </p>
          ))}
        </div>
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
    )
}

const Main = () => {

const {pokemons, masPokemons, verMas, searchPokemon } = usePokemons()
const [mostrar, setMostrar] = useState({ mostrar: false, pokemon: {} })
const [busqueda, setBusqueda] = useState('')
const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon })
const noVerPokemon = () => {
    setMostrar({ mostrar: false, pokemon: {}})
    setBusqueda('')
  }

  const buscarPokemon = async (e) => {
    e.preventDefault()

    if (!busqueda) return

    const pokemon = await searchPokemon(busqueda)
    console.log(pokemon);
    setMostrar({ mostrar: true, pokemon })
  }

    return (
        <main>
            <Cards {...mostrar} cerrar={noVerPokemon}/>
            <Search busqueda={busqueda} setBusqueda={setBusqueda} buscarPokemon={buscarPokemon}/>
            <section id="todos">
                <InfiniteScroll
                dataLength={pokemons.length}
                next={masPokemons}
                hasMore={verMas}
                loader={<img className="spinner" src="https://c.tenor.com/2lFt6lp1KaMAAAAi/run-pokemon.gif" alt="pikachu"></img>}
                endMessage={
                    <h3 className="endpokemon" style={{ gridColumn: "1/6"}}>Gotta Catch ‘em All</h3>
                }
                >
                <div className="pokemon-todos" id="listaPokemon">
            { pokemons.map(pokemon => <Pokemon {...pokemon} key={pokemon.id} verPokemon={() => verPokemon(pokemon)}/>)}
                </div>
                </InfiniteScroll>
            </section>
        </main>
    )
}

export default Main;
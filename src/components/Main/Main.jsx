import usePokemons from "../../hooks/usePokemons"
import InfiniteScroll from "react-infinite-scroll-component"
import "./Main.css"

function Pokemon({id, nombre, imagen, altura, peso, tipos}) {
    return (
        <div className="pokemons" key={id}>
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

const {pokemons, masPokemons, verMas} = usePokemons()

    return (
        <main>
            <section id="todos">
                <InfiniteScroll
                dataLength={pokemons.length}
                next={masPokemons}
                hasMore={verMas}
                loader={<h4>Loading...</h4>}
                >
                <div className="pokemon-todos" id="listaPokemon">
            { pokemons.map(pokemon => <Pokemon {...pokemon} key={pokemon.id}/>)}
                </div>
                </InfiniteScroll>
            </section>
        </main>
    )
}

export default Main;
import usePokemons from "../../hooks/usePokemons"
import "./Main.css"

function Pokemon({id, nombre, imagen, altura, peso, tipos}) {
    return (
        <div className="pokemon" key={id}>
            <p className="pokemon-id-back">{id}</p>
            <div className="pokemon-imagen">
                <img src={imagen} alt={nombre}/>
            </div>
            <div className="pokemon-info">
                <div className="nombre-contenedor">
                    <p className="pokemon-id">{id}</p>
                    <h2 className="pokemon-nombre">{nombre}</h2>
                </div>
                <div className="pokemon-tipos">
          {tipos.map((tipo, index) => (
            <p key={index} className={tipo}>
              {tipo}
            </p>
          ))}
        </div>
                <div className="pokemon-stats">
                    <p className="stat">{altura}</p>
                    <p className="stat">{peso}</p>
                </div>
            </div>
        </div>
    )
}

const Main = () => {

const {pokemons, masPokemons} = usePokemons()

    return (
        <main>
            <section className="pokemon-container">
            { pokemons.map(pokemon => <Pokemon {...pokemon} key={pokemon.id}/>)}
            
            </section>
            <button className="more-btn" onClick={masPokemons}>Mostrar más</button>
        </main>
    )
}

export default Main;
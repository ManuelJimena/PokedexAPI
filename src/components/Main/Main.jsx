import usePokemons from "../../hooks/usePokemons"
import "./Main.css"

function Pokemon({id, nombre, imagen}) {
    return (
        <div className="pokemon-card" key={id}>
        <img src={imagen} alt={nombre} className="pokemon-image"/>
        <p className="pokemon-title">
        <span>#{id}</span>
        <span>{nombre}</span>
        </p>
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
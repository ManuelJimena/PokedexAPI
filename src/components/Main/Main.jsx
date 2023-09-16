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

const {pokemons} = usePokemons()

    return (
        <main>
            <section className="pokemon-container">
            { pokemons.map(pokemon => <Pokemon {...pokemon}/>)}
            </section>
        </main>
    )
}

export default Main;
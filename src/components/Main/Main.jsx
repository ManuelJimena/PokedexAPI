import "./Main.css"
import { useEffect, useState } from 'react';

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

const [pokemons, setPokemons] = useState([])

useEffect(() => {
const getPokemons  = async () => {
//Recuperamos el listado de Pokemons
const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=24&offset=0")
const listaPokemons = await response.json()
const { results } = listaPokemons
const newPokemons = results.map( async (pokemon) => {
const response = await fetch(pokemon.url)
const poke = await response.json()

return {
    id: poke.id,
    nombre: poke.name,
    imagen: poke.sprites.other.dream_world.front_default
}
})

setPokemons(await Promise.all(newPokemons))

}
getPokemons()
  }, [])

    return (
        <main>
            <section className="pokemon-container">
            { pokemons.map(pokemon => <Pokemon {...pokemon}/>)}
            </section>
        </main>
    )
}

export default Main;
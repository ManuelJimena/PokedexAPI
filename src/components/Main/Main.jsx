import "./Main.css"
import { useEffect, useState } from 'react';
const Main = () => {

const [pokemons, setPokemons] = useState([])

useEffect(() => {
const getPokemons  = async () => {
//Recuperamos el listado de Pokemons
const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
const listaPokemons = await response.json()
const { results } = listaPokemons
const newPokemons = results.map( async (pokemon) => {
const response = await fetch(pokemon.url)
const poke = await response.json()

return {
    id: poke.id,
    name: poke.name,
    img: poke.sprites.other.dream_world.front_default
}
})

setPokemons(await Promise.all(newPokemons))

}
getPokemons()
  }, [])

    return (
        <main>
            {pokemons.map(pokemon => {
return (
    <div key={pokemon.id}>
        <img src={pokemon.img} alt={pokemon.name} />
        <p>{pokemon.name}</p>
        <span>{pokemon.id}</span>
    </div>
)
            })
            }
        </main>
    )
}

export default Main;
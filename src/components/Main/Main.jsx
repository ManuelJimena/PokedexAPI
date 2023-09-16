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
setPokemons(results)

}
getPokemons()
  }, [])

    return (
        <main>
            {pokemons.map(pokemon => <p key={pokemon.name}>{pokemon.name}</p>)}
        </main>
    )
}

export default Main;
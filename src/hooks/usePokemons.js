import { useEffect, useState } from 'react';
function usePokemons() {
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

      return {pokemons}
};

export default usePokemons;
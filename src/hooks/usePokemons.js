import { useEffect, useState } from 'react';
const UR_DEFAULT = "https://pokeapi.co/api/v2/pokemon?limit=24&offset=0"

function usePokemons() {
    const [pokemons, setPokemons] = useState([])
    const [siguienteUrl, setSiguienteUrl] = useState("")

    const getPokemons  = async (url = UR_DEFAULT) => {
        //Recuperamos el listado de Pokemons
        const response = await fetch(url)
        const listaPokemons = await response.json()
        const { next, results } = listaPokemons
        const newPokemons = await Promise.all(results.map( async (pokemon) => {
            const response = await fetch(pokemon.url)
            const poke = await response.json()
            let tipos = poke.types.map(type => type.type.name);
            
            return {
                id: poke.id,
                nombre: poke.name,
                imagen: poke.sprites.other["official-artwork"].front_default,
                altura: poke.height,
                peso: poke.weight,
                tipos: tipos
            }
            }))
        
        return {next, newPokemons}
        
    }

    const obtenerPokemons = async () => {
        const {next, newPokemons} = await getPokemons()
        setPokemons(newPokemons)
        setSiguienteUrl(next)
    }

    const masPokemons = async () => {
        const {next, newPokemons} = await getPokemons(siguienteUrl)
        setPokemons(prev => [...prev, ...newPokemons])
        setSiguienteUrl(next)
    }

    useEffect(() => {
    
    obtenerPokemons()
      }, [])

      return {pokemons, masPokemons}
};

export default usePokemons;
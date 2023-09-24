import { useEffect, useState } from 'react';
const UR_DEFAULT = "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"
const URL_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/'

function usePokemons() {
    const [pokemons, setPokemons] = useState([])
    const [siguienteUrl, setSiguienteUrl] = useState("")
    const [verMas, setVerMas] = useState(true)

    const fetchPokemon = async (url) => {
        const response = await fetch(url)
        const poke = await response.json()

            const abilities = poke.abilities.map(a => a.ability.name)
            const stats = poke.stats.map(s => {return { name: s.stat.name, base: s.base_stat}})
            const tipos = poke.types.map(t => t.type.name);
            
            return {
                id: poke.id,
                nombre: poke.name,
                imagen: poke.sprites.other["official-artwork"].front_default,
                abilities,
                stats,
                tipos,
                altura: poke.height,
                peso: poke.weight,
            }
         }
        
    const getPokemons = async (url = UR_DEFAULT) => {
        const response = await fetch(url)
        const listaPokemons = await response.json()
        const { next, results } = listaPokemons
        const newPokemons = await Promise.all(
            results.map((pokemon) => fetchPokemon(pokemon.url))
          )
      
          return { next, newPokemons }
        }

        const obtenerPokemons = async () => {
            const { next, newPokemons } = await getPokemons()
            setPokemons(newPokemons)
            setSiguienteUrl(next)
          }
        
          const masPokemons = async () => { 
            const { next, newPokemons } = await getPokemons(siguienteUrl)
            setPokemons(prev => [...prev, ...newPokemons])
            next === null && setVerMas(false)
            setSiguienteUrl(next)
          }
        
          const searchPokemon = async (busqueda) => {
            const url = `${URL_ENDPOINT}${busqueda.toLocaleLowerCase()}`
            return await fetchPokemon(url)
          }
        
          useEffect(() => { obtenerPokemons() }, [])
        
          return { pokemons, masPokemons, verMas, searchPokemon }
        }
        
        export default usePokemons
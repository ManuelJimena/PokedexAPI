import { useEffect, useState } from 'react';

const UR_DEFAULT = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0";
const URL_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

function usePokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [siguienteUrl, setSiguienteUrl] = useState("");
  const [verMas, setVerMas] = useState(true);

  // Función para obtener información de un Pokémon desde su URL.
  const fetchPokemon = async (url) => {
    const response = await fetch(url);
    const poke = await response.json();

    // Extracción de datos relevantes del Pokémon.
    const abilities = poke.abilities.map(a => a.ability.name);
    const stats = poke.stats.map(s => ({ name: s.stat.name, base: s.base_stat }));
    const tipos = poke.types.map(t => t.type.name);

    return {
      id: poke.id,
      nombre: poke.name,
      imagen: poke.sprites.back_default,
      abilities,
      stats,
      tipos,
      altura: poke.height,
      peso: poke.weight,
    };
  };

  // Función para obtener una lista de Pokémones desde una URL.
  const getPokemons = async (url = UR_DEFAULT) => {
    const response = await fetch(url);
    const listaPokemons = await response.json();
    const { next, results } = listaPokemons;

    // Obtenemos información detallada de cada Pokémon en la lista.
    const newPokemons = await Promise.all(
      results.map((pokemon) => fetchPokemon(pokemon.url))
    );

    return { next, newPokemons };
  };

  // Función para cargar la lista inicial de Pokémones.
  const obtenerPokemons = async () => {
    const { next, newPokemons } = await getPokemons();
    setPokemons(newPokemons);
    setSiguienteUrl(next);
  };

  // Función para cargar más Pokémones a la lista.
  const masPokemons = async () => {
    const { next, newPokemons } = await getPokemons(siguienteUrl);
    setPokemons(prev => [...prev, ...newPokemons]);
    next === null && setVerMas(false);
    setSiguienteUrl(next);
  };

  // Función para buscar información de un Pokémon por nombre.
  const searchPokemon = async (busqueda) => {
    const url = `${URL_ENDPOINT}${busqueda.toLocaleLowerCase()}`;
    return await fetchPokemon(url);
  };

  // Cargar la lista inicial de Pokémones cuando el componente se monta.
  useEffect(() => {
    obtenerPokemons();
  }, []);

  // Devolver las funciones y datos relevantes para el componente que usa este hook.
  return { pokemons, masPokemons, verMas, searchPokemon };
}

export default usePokemons;

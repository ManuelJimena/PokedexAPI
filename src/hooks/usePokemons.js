import { useState, useEffect } from "react";
import axios from "axios";

export const URL_DEFAULT = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0&distinct=true";
export const URL_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

function usePokemons() {
  // Estado para almacenar la lista de Pokémon
  const [pokemons, setPokemons] = useState([]);
  // Estado para la URL de la siguiente página de resultados
  const [siguienteUrl, setSiguienteUrl] = useState("");
  // Estado para controlar si hay más resultados por cargar
  const [verMas, setVerMas] = useState(true);
  // Estado para almacenar el tipo de Pokémon seleccionado
  const [cargando, setCargando] = useState(false);

  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  // Estado para controlar si se ha terminado de mostrar la lista de pokemons filtrados por tipo.
  const [endOfList, setEndOfList] = useState(false);

  // Función para obtener los detalles de un Pokémon
  const fetchPokemon = async (url) => {
    const { data } = await axios.get(url);

    // Extrae información relevante del Pokémon
    const abilities = data.abilities.map((a) => a.ability.name);
    const stats = data.stats.map((s) => ({ name: s.stat.name, base: s.base_stat, }));
    const tipos = data.types.map((t) => t.type.name);

    return {
      id: data.id,
      nombre: data.name,
      imagen: data.sprites.other["official-artwork"].front_default,
      animation:data.sprites.versions["generation-v"]["black-white"].animated.front_default,
      abilities,
      stats,
      tipos,
      altura: data.height,
      peso: data.weight,
    };
  };

  // Función para obtener una página de Pokémon
  const fetchPokemons = async (url = URL_DEFAULT) => {
    const { data } = await axios.get(url);
    const { next, results } = data;
    // Obtiene detalles de cada Pokémon en la página
    const newPokemons = await Promise.all(
      results.map(({ url }) => fetchPokemon(url))
    );
    return { next, newPokemons };
  };

  // Función para obtener todos los Pokémon iniciales
  const obtenerPokemons = async () => {
    if (!cargando) {
      setCargando(true);
      const { next, newPokemons } = await fetchPokemons(URL_DEFAULT);
      setPokemons(newPokemons);
      setSiguienteUrl(next);
      setVerMas(next !== null);
      setCargando(false);
    }
  };

  // Función para cargar más Pokémon
  const masPokemons = async () => {
    if (siguienteUrl && !cargando) {
      setCargando(true);
      const { next, newPokemons } = await fetchPokemons(siguienteUrl);
      setPokemons(prev => [...prev, ...newPokemons]);
      setSiguienteUrl(next);
      setVerMas(next !== null);
      setCargando(false);
    }
  };

  // Función para buscar un Pokémon por nombre
  const searchPokemon = async (busqueda) => {
    const url = `${URL_ENDPOINT}${busqueda.toLocaleLowerCase()}`;
    const { data } = await axios.get(url);
    return fetchPokemon(url);
  };

  // Función para obtener todos los Pokémon de un tipo específico
  const fetchAllPokemonsByType = async (tipo) => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/type/${tipo}`
      );

      const pokemonByTypeUrls = new Set();
      const nonEmptyPages = data["pokemon"].filter(
        (p) => p["pokemon"]["name"] !== ""
      );
      for (let i = 0; i < nonEmptyPages.length; i++) {
        const { url } = nonEmptyPages[i]["pokemon"];
        pokemonByTypeUrls.add(url);
      }

      const pokemonByType = await Promise.all(
        [...pokemonByTypeUrls].map((url) => fetchPokemon(url))
      );

      setEndOfList(true);
      setPokemons(pokemonByType);
      setTipoSeleccionado(tipo);
    } catch (error) {
      console.log(error);
      setPokemons([]);
    }
  };

  // Función para filtrar Pokémon por tipo
  const filtrarPorTipo = async (tipo) => {
    if (tipo === "all pokemon") {
      await obtenerPokemons();
      setTipoSeleccionado("");
      setEndOfList(false);
    } else {
      await fetchAllPokemonsByType(tipo);
    }
  };

  // Carga los Pokémon iniciales al montar el componente
  useEffect(() => {
    obtenerPokemons();
  }, []);

  // Devuelve los datos y funciones relevantes para la aplicación
  return { pokemons, masPokemons, verMas, cargando, searchPokemon, filtrarPorTipo, tipoSeleccionado, endOfList, setEndOfList };
}

export default usePokemons;
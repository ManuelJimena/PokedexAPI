import "./Species.css";

const Species = () => {
    const tiposDePokemon = [
        "all pokemons",
        "grass",
        "fire",
        "water",
        "electric",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "steel",
        "fairy",
        "normal"
      ]; 
      
    return (
<nav className="nav">
            <ul className="nav-list">
                {tiposDePokemon.map((tipo) => <li key={tipo}><button className={tipo}>{tipo}</button></li>)}  
            </ul>
        </nav>
    )
};

export default Species;
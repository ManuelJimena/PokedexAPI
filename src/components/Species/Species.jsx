import "./Species.css";

const Species = () => {
    const tiposDePokemon = [
        "ver todos",
        "planta",
        "fuego",
        "agua",
        "eléctrico",
        "hielo",
        "lucha",
        "veneno",
        "tierra",
        "volador",
        "psíquico",
        "bicho",
        "roca",
        "fantasma",
        "dragón",
        "siniestro",
        "acero",
        "hada",
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
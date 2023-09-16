import "./Species.css";

const Species = () => {
    const tiposDePokemon = [
        "Ver todos",
        "Planta",
        "Fuego",
        "Agua",
        "Eléctrico",
        "Hielo",
        "Lucha",
        "Veneno",
        "Tierra",
        "Volador",
        "Psíquico",
        "Bicho",
        "Roca",
        "Fantasma",
        "Dragón",
        "Siniestro",
        "Acero",
        "Hada",
        "Normal"
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
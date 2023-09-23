import React, { useEffect } from "react";
import "./Species.css";
import logo from "../../assets/Poké_Ball.svg"

const Species = () => {
  useEffect(() => {
    const scrollButton = document.getElementById("scroll-button");
    const allPokemonsSection = document.getElementById("all-pokemons-section");

    const handleScroll = () => {
      if (window.scrollY > 200) {
        scrollButton.style.display = "block";
      } else {
        scrollButton.style.display = "none";
      }
    };

    const handleClick = () => {
      allPokemonsSection.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);
    scrollButton.addEventListener("click", handleClick);

    // Limpia los event listeners cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollButton.removeEventListener("click", handleClick);
    };
  }, []);

  const tiposDePokemon = [
    "all pokemon",
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
    <div>
      <nav className="nav" translate="no">
        <ul className="nav-list">
          {tiposDePokemon.map((tipo) => (
            <li key={tipo}>
              <button className={tipo}>{tipo}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Imagen en la esquina inferior derecha */}
      <img 
        src={logo}
        alt="Botón de scroll"
        className="scroll-button"
        id="scroll-button"
      />

      {/* Sección "All Pokemons" */}
      <div id="all-pokemons-section">
        {/* Contenido de la sección "All Pokemons" */}
      </div>
    </div>
  );
};

export default Species;

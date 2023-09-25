import "./Scroll.css";
import { useEffect, useState } from "react";
import logo from "../../assets/Poké_Ball_icon.png";

const Scroll = () => {
  // Define el estado showScrollButton (boolean) que controla la visibilidad del botón de scroll
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Función que se ejecuta al hacer clic en la imagen de la esquina inferior derecha
  const handleClick = () => {
    // Obtiene la referencia a la sección con el id "all-pokemons-section"
    const allPokemonsSection = document.getElementById("all-pokemons-section");

    // Hace scroll suave (smooth) hacia la sección "all-pokemons-section"
    allPokemonsSection.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Función que se ejecuta cuando el usuario hace scroll en la página
    const handleScroll = () => {
      // Verifica si el usuario ha hecho suficiente scroll hacia abajo (200 píxeles)
      if (window.scrollY > 200) {
        // Si es así, muestra el botón de scroll
        setShowScrollButton(true);
      } else {
        // Si no, oculta el botón de scroll
        setShowScrollButton(false);
      }
    };

    // Agrega un event listener al objeto window para escuchar los eventos de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpia el event listener cuando el componente se desmonta para evitar fugas de memoria
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // El array vacío asegura que el effect solo se ejecute una vez, al montar el componente

  return (
    <div>
      {/* Imagen en la esquina inferior derecha que aparece cuando el usuario hace suficiente scroll */}
      {showScrollButton && (
        <img
          src={logo}
          alt="Botón de scroll"
          className="scroll-button"
          id="scroll-button"
          onClick={handleClick} // Al hacer clic en la imagen, se llama a la función handleClick
        />
      )}

      {/* Sección "All Pokemons" */}
      <div id="all-pokemons-section">
        {/* Contenido de la sección "All Pokemons" */}
      </div>
    </div>
  );
};

export default Scroll;

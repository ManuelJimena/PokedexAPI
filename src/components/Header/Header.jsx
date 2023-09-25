import "./Header.css";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo_Pokédex.png";
import sound from "../../assets/MainTheme.mp3";

const Header = () => {
  // Obtener el tema actual del localStorage o usar 'claro' como valor predeterminado
  const [tema, setTema] = useState(localStorage.getItem("tema") || "claro");
  const [musicaReproduciendose, setMusicaReproduciendose] = useState(false);
  const audioRef = useRef(null);

  const handleChange = (e) => {
    const nuevoTema = e.target.checked ? "oscuro" : "claro";
    setTema(nuevoTema);
    // Guardar el tema en el localStorage cuando cambie
    localStorage.setItem("tema", nuevoTema);
  };

  const reproducirMusica = () => {
    if (!musicaReproduciendose) {
      if (audioRef.current) {
        audioRef.current.play();
      } else {
        const audio = new Audio(sound);
        audio.play();
        audioRef.current = audio;
      }
      setMusicaReproduciendose(true);
    }
  };

  const detenerMusica = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setMusicaReproduciendose(false);
  };

  useEffect(() => {
    // Configurar el tema en el body y guardar en el localStorage cuando cambie
    document.body.setAttribute("data-tema", tema);
    localStorage.setItem("tema", tema);
  }, [tema]);

  return (
    <header translate="no">
      <a href="#/" onClick={musicaReproduciendose ? detenerMusica : reproducirMusica}>
        <img src={logo} alt="logo pokédex" className="logo" />
      </a>
      <div className="switch">
        <i className="bx bx-sun" id="darkMode-icon" />
        <label>
          <input type="checkbox" className="checkswitch" onChange={handleChange} hidden />
          <span className="slider">
            <img src="/Poké_Ball_icon.svg" alt="icon" />
          </span>
        </label>
        <i className="bx bx-moon" />
      </div>
    </header>
  );
};

export default Header;
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo_Pokédex.png";
import sound from "../../assets/MainTheme.mp3";
import "./Header.css";

const Header = () => {
  // Obtener el tema y el switch actual del localStorage o usar valores predeterminados
  const [tema, setTema] = useState(localStorage.getItem("tema") || "claro");
  const [switchState, setSwitchState] = useState(localStorage.getItem("switchState") === "true");

  const audioRef = useRef(null);

  // Cambiar el tema y guardar la selección del usuario en el localStorage
  const handleChange = (e) => {
    const nuevoTema = e.target.checked ? "oscuro" : "claro";
    setTema(nuevoTema);
    setSwitchState(e.target.checked);
    localStorage.setItem("tema", nuevoTema);
    localStorage.setItem("switchState", e.target.checked);
  };

  // Reproducir la música principal de fondo
  const reproducirMusica = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
    }
    audioRef.current.play();
  };

  // Detener la reproducción de la música principal
  const detenerMusica = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Cambiar el tema seleccionado e iniciar o detener la música principal según sea necesario
  useEffect(() => {
    document.body.setAttribute("data-tema", tema);
    localStorage.setItem("tema", tema);
    localStorage.setItem("switchState", switchState);
    if (audioRef.current) {
      detenerMusica();
      reproducirMusica();
    }
  }, [tema, switchState]);

  // Cargar la configuración del 'switch' desde el localStorage
  useEffect(() => {
    const storedSwitch = localStorage.getItem("switchState");
    if (storedSwitch) {
      setSwitchState(storedSwitch === "true");
    }
  }, []);

  return (
    <header translate="no">
      {/* Añade el logo de la Pokédex que al hacer clic reproduce o detiene la música de fondo */}
      <a href="#/" onClick={audioRef.current?.paused ? reproducirMusica : detenerMusica}>
        <img src={logo} alt="logo pokédex" className="logo" />
      </a>
      {/* Muestra un 'switch' para seleccionar el tema claro u oscuro */}
      <div className="switch">
        <i className="bx bx-sun" id="darkMode-icon" />
        <label>
          <input 
            type="checkbox" 
            className="checkswitch" 
            onChange={handleChange} 
            checked={switchState} 
          />
          <span className="slider">
            <img src="./Poké_Ball_icon.svg" alt="icon" />
          </span>
        </label>
        <i className="bx bx-moon" />
      </div>
    </header>
  );
};

export default Header;
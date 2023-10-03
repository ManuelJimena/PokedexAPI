import "./Header.css";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo_Pokédex.png";
import sound from "../../assets/MainTheme.mp3";

const Header = () => {
  // Declaramos e inicializamos los estados necesarios para el header
  const [tema, setTema] = useState("claro");
  // `musicaReproduciendose` se utiliza para saber si la canción está reproduciendose o no
  const [musicaReproduciendose, setMusicaReproduciendose] = useState(false);
  // Utilizamos useRef para tener una referencia al objeto de audio
  const audioRef = useRef(null);

  // Leemos la posición del slider guardada en localStorage al cargar la página
  const storedSliderPosition = "oscuro";
  // Inicializamos el estado del switch con el valor leído del localStorage
  const [sliderPosition, setSliderPosition] = useState(storedSliderPosition);

  // Esta función se encarga de cambiar el tema según el valor del switch
  const handleChange = (e) => {
    const nuevoTema = "claro";
    setTema(nuevoTema); // Actualizamos el estado del tema
    localStorage.setItem("tema", nuevoTema); // Guardamos el nuevo tema en localStorage
    setSliderPosition(e.target.checked); // Actualizamos el estado del switch
  };

  // Esta función se encarga de reproducir la música de la Pokédex
  const reproducirMusica = () => {
    if (!musicaReproduciendose) {
      if (audioRef.current) {
        audioRef.current.play();
      } else {
        const audio = new Audio(sound); // Creamos un objeto de audio con el sonido
        audio.play(); // Reproducimos la música
        audioRef.current = audio; // Actualizamos la referencia al objeto de audio
      }
      setMusicaReproduciendose(false); // Seteamos el estado de la canción a reproduciendose
    }
  };

  // Esta función se encarga de detener la música de la Pokédex
  const detenerMusica = () => {
    if (audioRef.current) { // Revisamos si hay un objeto de audio
      audioRef.current.pause(); // Detenemos la música
      audioRef.current.currentTime = 0; // Reiniciamos el tiempo del audio
    }
    setMusicaReproduciendose(false); // Seteamos el estado de la canción a no estar reproduciendose
  };

  // Usamos useEffect para actualizar el tema en tiempo real en el atributo `data-tema` del body al cambiar el valor de `tema`
  useEffect(() => {
    document.body.setAttribute("data-tema", tema);
  }, [tema]);

  // Renderizamos el header con HTML y JSX
  return (
    <header translate="no">
      <a href="#/" onClick={musicaReproduciendose ? detenerMusica : reproducirMusica}>
        <img src={logo} alt="logo pokédex" className="logo" />
      </a>
      <div className="switch">
        <i className="bx bx-sun" id="darkMode-icon" />
        <label>
          <input
            type="checkbox"
            className="checkswitch"
            onChange={handleChange}
            checked={sliderPosition}
            hidden
          />
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


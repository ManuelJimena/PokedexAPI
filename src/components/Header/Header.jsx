import "./Header.css";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo_Pokédex.png"
import sound from "../../assets/MainTheme.mp3";

const Header = () => {
    const [tema, setTema] = useState('claro');
    const [musicaReproduciendose, setMusicaReproduciendose] = useState(false);
    const audioRef = useRef(null);

    const handleChange = (e) => setTema(e.target.checked ? 'oscuro' : 'claro');

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
        document.body.setAttribute('data-tema', tema);
    }, [tema]);

    return (
        <header translate="no">
            <a href="#/" onClick={musicaReproduciendose ? detenerMusica : reproducirMusica}>
                <img src={logo} alt="logo pokédex" className="logo" />
            </a>
            <div className="switch">
                <i className="bx bx-sun" id="darkMode-icon" />
                <label>
                    <input type="checkbox" className="checkswitch" onChange={handleChange} hidden/>
                    <span className="slider">
                        <img src="/Poké_Ball_icon.svg" alt="icon" />
                    </span>
                </label>
                <i className="bx bx-moon" />
            </div>
        </header>
    )
};

export default Header;
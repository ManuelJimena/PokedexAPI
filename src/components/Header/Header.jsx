import "./Header.css";
import { useState, useEffect } from "react";
import logo from "../../assets/logo_Pokédex.png"

const Header = () => {

    const [tema, setTema] = useState('claro')

    const handleChange = (e) => setTema(e.target.checked ? 'oscuro' : 'claro')
  
    useEffect(() => {
      document.body.setAttribute('data-tema', tema)
    }, [tema])

    return (
        <header>
            <a href="#/"><img src={logo} alt="logo pokédex" className="logo"/></a>
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
import "./Header.css";
import logo from "../../assets/logo_Pokédex.png"

const Header = () => {
    return (
        <header>
            <img src={logo} alt="logo pokédex" className="logo"/>
            <div className="switch">
                <i className="bx bx-sun" id="darkMode-icon" />
                <label>
                    <input type="checkbox" className="checkswitch" hidden/>
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
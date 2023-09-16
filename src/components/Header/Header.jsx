import "./Header.css";
import logo from "../../assets/logo_Pokédex.png"
const Header = () => {
    return (
        <header>
            <img src={logo} alt="logo pokédex" className="logo"/>
        </header>
    )
};

export default Header;
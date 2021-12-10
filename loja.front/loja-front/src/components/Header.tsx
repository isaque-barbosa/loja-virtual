import { Link } from "react-router-dom";

import Logo from "../images/logo.svg";

import { isAuthenticated, logout, getEmail } from "../services/auth";

import "../styles/nav.css";

export function Header(){

    function IsActive(path: string){
        if(window.location.pathname === path) return "active"
        return "";
    }

    //const [user, setUser] = useState<string>("");
    let user = "";

    if(isAuthenticated())
    {
        user = getEmail().split("@")[0];
    }

    return(
        <div className="topnav">
            <div>
                <Link to="/"><img src={Logo} alt="Logo da empresa" /></Link>
            </div>
            <div className="search-container">
                <form>
                    <input type="text" placeholder="Insira um nome de um produto" name="search" />
                    <button type="submit">Procurar</button>
                </form>
            </div>
            { isAuthenticated() && <a>Olá, {user}!</a> }
            <Link className={IsActive("/carrinho")} to="/carrinho">Carrinho</Link>
            { isAuthenticated() && <Link onClick={() => {logout(); window.location.reload();}} to="/">Sair</Link> }
            { !isAuthenticated() && <Link className={IsActive("/login")} to="/login">Entrar</Link> }
        </div>
    );
}
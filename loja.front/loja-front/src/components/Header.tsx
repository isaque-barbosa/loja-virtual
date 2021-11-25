import { Link } from "react-router-dom";

import Logo from "../images/logo.svg";

import "../styles/nav.css";

export function Header(){

    function IsActive(path: string){
        if(window.location.pathname === path) return "active"
        return "";
    }

    return(
        <div className="topnav">
            <div>
                <img src={Logo} alt="Logo da empresa" />
            </div>
            <div className="search-container">
                <form>
                    <input type="text" placeholder="Insira um nome de um produto" name="search" />
                    <button type="submit">Procurar</button>
                </form>
            </div>
            <Link className={IsActive("/login")} to="/login">Entrar</Link>
            <Link className={IsActive("/")} to="/">Carrinho</Link>
        </div>
    );
}
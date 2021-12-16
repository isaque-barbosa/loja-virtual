import { Link } from "react-router-dom";

import Logo from "../images/logo.svg";

import { isAuthenticated, logout, getEmail } from "../services/auth";

import "../styles/nav.css";

export function Header(){

    function abrirDropdown() {
        document?.getElementById("myDropdown")?.classList.toggle("show");
    }

    window.onclick = function(e) {
        if(e.target instanceof Element){
            if (!e?.target?.matches('.dropbtn')) {
                var myDropdown = document.getElementById("myDropdown");
                if (myDropdown?.classList.contains('show')) {
                    myDropdown.classList.remove('show');
                }
            }
        }
    }

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
            { isAuthenticated() && <div className="dropdown">
                                        <button className="dropbtn" onClick={abrirDropdown}>Olá, {user}!
                                            <i className="fa fa-caret-down"></i>
                                        </button>
                                        <div className="dropdown-content" id="myDropdown">
                                            <Link to="/">Meu Perfil</Link>
                                            <Link onClick={() => {logout(); window.location.reload();}} to="/">Sair</Link>
                                        </div>
                                    </div> }
            <Link className={IsActive("/carrinho")} to="/carrinho">Carrinho</Link>
            { !isAuthenticated() && <Link className={IsActive("/login")} to="/login">Entrar</Link> }
        </div>
    );
}
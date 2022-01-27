import { Link } from "react-router-dom";

import Logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { isAuthenticated, logout, getEmail } from "../services/auth";

import "../styles/nav.css";
import { useFetch } from "../hooks/useFetch";
import { carrinhoUrl } from "../services/api";

export function Header(){

    const { data } = useFetch<number>(`${carrinhoUrl}carrinho/obter-quantidade-itens`);

    function abrirDropdown() {
        document?.getElementById("myDropdown")?.classList.toggle("show");
    }

    function abrirNavbar() {
        document?.getElementById("navbarSupportedContent")?.classList.toggle("show");
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

    // return(
    //     <div className="topnav">
    //         <div>
    //             <Link to="/"><img src={Logo} alt="Logo da empresa" /></Link>
    //         </div>
    //         <div className="search-container">
    //             <form>
    //                 <input type="text" placeholder="Insira um nome de um produto" name="search" />
    //                 <button type="submit">Procurar</button>
    //             </form>
    //         </div>
    //         { isAuthenticated() && <div className="dropdown">
    //                                     <button className="dropbtn" onClick={abrirDropdown}>Olá, {user}!
    //                                         <i className="fa fa-caret-down"></i>
    //                                     </button>
    //                                     <div className="dropdown-content" id="myDropdown">
    //                                         <Link to="/">Meu Perfil</Link>
    //                                         <Link onClick={() => {logout(); window.location.reload();}} to="/">Sair</Link>
    //                                     </div>
    //                                 </div> }
    //         <Link className={IsActive("/carrinho")} to="/carrinho">Carrinho</Link>
    //         { !isAuthenticated() && <Link className={IsActive("/login")} to="/login">Entrar</Link> }
    //     </div>
    // );
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={Logo} alt="Logo da empresa" />
                </Link>
                <form className="d-flex" style={{width: "65%"}}>
                    <input className="form-control me-2 w-100" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => abrirNavbar()}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">

                            <li className="nav-item position-relative me-3">
                                <Link className={"nav-link"} to="/carrinho">
                                    <FontAwesomeIcon style={{width: 50, height: 19}} icon={faShoppingCart} />
                                </Link>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {data || 0}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </li>
                        
                            {!isAuthenticated() && <li className="nav-item">
                                                        <Link className={"nav-link " + IsActive("/carrinho")} to="/login">
                                                            Entrar
                                                        </Link>
                                                    </li>}

                            {isAuthenticated() && <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle dropbtn" onClick={abrirDropdown} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Olá, {user}!
                                </button>
                                <ul className="dropdown-menu" id="myDropdown" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Meu Perfil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" 
                                            onClick={() => {logout(); window.location.reload();}}
                                            to="#">
                                                Sair
                                        </Link>
                                    </li>
                                </ul>
                            </div>}

                    </ul>
                </div>
            </div>
        </nav>
    );
}
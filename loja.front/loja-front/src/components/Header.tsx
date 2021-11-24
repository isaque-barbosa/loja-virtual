import "../styles/nav.css";
import Logo from "../images/logo.svg";

export function Header(){

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
            <a className="active" href="#contact">Entrar</a>
            <a href="#news">Carrinho</a>
        </div>
    );
}
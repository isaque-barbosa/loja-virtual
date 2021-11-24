import { MainContent } from "../hooks/MainContent";

export function Login(){

    return(
        <MainContent>
            <div>
                <form>
                    <label>E-mail</label>
                    <input />
                    <label>Senha</label>
                    <input />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </MainContent>
    );
}
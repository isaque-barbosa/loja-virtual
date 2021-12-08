import React, { useState } from "react";
import { Link} from "react-router-dom";

import { MainContent } from "../../hooks/MainContent";
import api, { Error } from "../../services/api";

import { getToken, login, TokenAcess } from "../../services/auth";

import { Container, Form } from "./styles";

interface User {
    email: string;
    senha: string;
}

export const LogIn: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [error, setError] = useState<string>();

    const handleLogin: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        const model = { email: email, senha: senha } as User;

        api.post<TokenAcess>("api/identidade/autenticar", model)
            .then(response => {
                login(response.data);
                console.log(getToken());
            })
            .catch(function (error) {
                console.log(error.response.data as Error);
            });

        e.preventDefault();
    };

    return(
        <MainContent>
            <Container>
                <Form onSubmit={handleLogin}>
                    <label>E-mail</label>
                    <input type="email"
                           placeholder="example@hotmail.com"
                           onChange={x => setEmail(x.target.value)} />
                    <label>Senha</label>
                    <input type="password"
                           placeholder="Insira sua senha aqui"
                           onChange={x => setSenha(x.target.value)} />
                    <button type="submit">Entrar</button>
                    <hr />
                    <Link to="/registrar">Criar conta grátis</Link>
                </Form>
            </Container>
        </MainContent>
    );
};
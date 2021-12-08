import React, { useState } from "react";

import { MainContent } from "../../hooks/MainContent";
import api from "../../services/api";

import Logo from "../../images/logo.svg";
import { Container, Form } from "./styles";

interface User {
    email: string;
    senha: string;
    senhaConfirmacao: string;
}

export const Registrar: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [senhaConfirmacao, setSenhaConfirmacao] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleRegistrar: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        const model = { email: email, senha: senha, senhaConfirmacao: senhaConfirmacao } as User;

        if(!model){
            setError("Ocorreu algum erro! Tente novamente após alguns minutos.");
        }
        if(!model.email.trim() || !model.senha.trim() || !model.senhaConfirmacao.trim()){
            setError("Todos os campos precisam ser preenchidos!");
        }
        if(model.senha !== model.senhaConfirmacao){
            setError("A senha e a confirmação de senha precisam ser iguais");
        }

        api.post("api/identidade/nova-conta", model);

        e.preventDefault();
    };

    return(
        <MainContent>
            <Container>
                <Form onSubmit={handleRegistrar}>
                    <img src={Logo} alt="Loja Online logo" />
                    {error && <p>{error}</p>}
                    <label>E-mail</label>
                    <input type="email"
                           placeholder="example@hotmail.com"
                           onChange={x => setEmail(x.target.value)} />
                    <label>Senha</label>
                    <input type="password"
                           placeholder="Insira sua senha aqui"
                           onChange={x => setSenha(x.target.value)} />
                    <label>Confirmar Senha</label>
                    <input type="password"
                           placeholder="Confirme sua senha"
                           onChange={x => setSenhaConfirmacao(x.target.value)} />
                    <button type="submit">Entrar</button>
                </Form>
            </Container>
        </MainContent>
    );
};
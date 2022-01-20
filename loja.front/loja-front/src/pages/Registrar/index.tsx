import React, { useState } from "react";

import { MainContent } from "../../components/MainContent";
import api from "../../services/api";

import Logo from "../../images/logo.svg";
import { Container, Form } from "./styles";

interface User {
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    senhaConfirmacao: string;
}

export const Registrar: React.FC = () => {

    const [nome, setNome] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [senhaConfirmacao, setSenhaConfirmacao] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleRegistrar: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        const model = { nome: nome, cpf: cpf, email: email, senha: senha, senhaConfirmacao: senhaConfirmacao } as User;

        if(!model){
            setError("Ocorreu algum erro! Tente novamente após alguns minutos.");
        }
        if(!model.nome.trim() || !model.cpf.trim() || !model.email.trim() || !model.senha.trim() || !model.senhaConfirmacao.trim()){
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

                    <label>Nome</label>
                    <input type="text"
                           onChange={x => setNome(x.target.value)} />

                    <label>CPF</label>
                    <input type="number"
                           placeholder="12345678912"
                           onChange={x => setCpf(x.target.value)} />

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
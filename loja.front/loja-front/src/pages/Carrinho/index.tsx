import React from "react";

import { MainContent } from "../../components/MainContent";
import { useFetch } from "../../hooks/useFetch";

import { carrinhoUrl } from "../../services/api";

interface ICarrinho {
    valorTotal: number;
    itens: Item[];
};

export interface Item {
    produtoId: string;
    nome: string;
    quantidade: number;
    valor: number;
    imagem: string;
}

export const Carrinho: React.FC = () => {
    const { data } = useFetch<ICarrinho>(`${carrinhoUrl}carrinho`);

    console.log(data);

    if(!data){
        return <p>Carregando...</p>
    }

    return(
        <MainContent>
            <ul>
                {data.itens.map(itens => (
                    <li key={itens.produtoId}>
                        <label>{itens.nome}</label>
                    </li>
                ))}
            </ul>
        </MainContent>
    );
};
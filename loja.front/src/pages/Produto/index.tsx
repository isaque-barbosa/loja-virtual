import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { MainContent } from "../../components/MainContent";
import { Carregando } from "../../components/Carregando";

import { useFetch } from "../../hooks/useFetch";
import { CurrencyMask } from "../../services/mask";
import api, { Error, catalogoUrl, comprasBffUrl } from "../../services/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { CardBody, Button } from "./styles";

export interface IProduto {
    id: string;
    nome: string;
    categoria: string;
    descricao: string;
    valor: number;
    imagem: string;
}

export interface Item {
    produtoId: string;
    quantidade: number;
}

export const Produto: React.FC = () => {
    const { id } = useParams();

    const { data } = useFetch<IProduto>(`${catalogoUrl}catalogo/produtos/${id}`);

    const [quantidade, setQuantidade] = useState<number>(1);

    async function comprar(){        

        const model = { produtoId: id, quantidade: quantidade } as Item;

        api.post(`${comprasBffUrl}compras/carrinho/items`, model)
            .then(response => {
                console.log("Produto adicionado ao carrinho!");
            })
            .catch(function (error){
                try{
                    const response  = error.response.data as Error;
                    console.log(response);
                }
                catch{
                    console.log("Servidor indisponível. Desculpe a inconveniência! Tente novamente mais tarde.");
                }
            });
    }

    console.log(data);
    if(!data){
        return <Carregando />;
    }

    return(
        <MainContent>
            <div className="card mb-3">
                <div className="row g-0">

                    <div className="col-md-4">
                        <img src="https://a-static.mlcdn.com.br/1500x1500/camisa-social-masculina-manga-longa-slim-botoes-duplo-azul-ceu-us-born/estilomodas/5245901416/a06bff7439beadf189edda14611bff20.jpg"
                        className="card-img-top"
                        alt={data.descricao} />
                    </div>

                    <div className="col-md-8">
                        <CardBody className="card-body">
                            
                            <h5 className="card-title">
                                {data.nome}
                            </h5>
                            <p className="card-text">
                                {data.descricao}
                            </p>
                            <div className="card-text my-3">
                                <div className="input-group w-25">
                                    <button className="btn btn-primary"
                                        onClick={() => {
                                            if(quantidade === 1) return; setQuantidade(quantidade - 1)
                                    }}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <input 
                                        type="number"
                                        value={quantidade}
                                        className="form-control"
                                        onChange={x => {
                                            let numeroInput: number = parseInt(x.target.value) || 1;
                                            if(numeroInput === 0) return;
                                            setQuantidade(numeroInput);
                                        }}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setQuantidade(quantidade + 1)}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                            <p className="card-text h1">
                                {CurrencyMask.format(data.valor)}
                            </p>
                            
                        </CardBody>

                        <Button
                            onClick={() => comprar()}
                            className="btn btn-primary"
                        >
                            Comprar
                        </Button>
                    </div>                   

                </div>                
            </div>
        </MainContent>
    );
};
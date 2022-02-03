import React, { useState } from "react";
import { Link } from "react-router-dom";

import { MainContent } from "../../components/MainContent";
import { Carregando } from "../../components/Carregando";

import { useFetch } from "../../hooks/useFetch";
import { CurrencyMask } from "../../services/mask";
import { produce } from "immer";

import api, { Error, carrinhoUrl } from "../../services/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSync, faChevronRight, faChevronLeft, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Imagem } from "./styles";

import Camiseta from "../../images/produtos/camiseta1.jpg"
import FormaPagamento from "../../images/misc/payments.png";
import { Alert } from "react-bootstrap";

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

    const [itens, setItens] = useState<Item[]>(data?.itens || []);
    const [error, setError] = useState<string[]>();
    const [showAlert, setShowAlert] = useState(false);

    console.log(data);

    async function deletarItem(produtoId: string){
        await api.delete(`${carrinhoUrl}carrinho/remover-item/${produtoId}`)
        .then(response => {
            console.log("Produto Excluido com Sucesso.");
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

    function AlertDismissible(){

        return (
          <Alert variant="danger" hidden={!showAlert} onClose={() => setShowAlert(false)} dismissible>
              <Alert.Heading>Ops! Algo deu errado. :(</Alert.Heading>
                  {error?.map((error, i) => {
                      return <li key={i}>{error}</li> 
                  })}
          </Alert>
        );
  }

    async function atualizarItem(produtoId: string){
        const quantidade = itens.find(x => x.produtoId == produtoId)?.quantidade;
        const erros = [] as string[];

        await api.put(`${carrinhoUrl}carrinho/atualizar-item/${produtoId}/${quantidade}`)
        .then(response => {
            console.log("Produto atualizado com sucesso.");
        })
        .catch(function (error){
            try{
                const response  = error.response.data as Error;
                response.errors.Mensagens.forEach(mensagem => erros.push(mensagem));
                console.log(response);
            }
            catch{
                console.log("Servidor indisponível. Desculpe a inconveniência! Tente novamente mais tarde.");
            }
        });
        setError(erros);
        setShowAlert(true);
    }

    if(!data){
        return <Carregando />;
    }

    return(
        <MainContent>
            <section className="padding-y my-3">
                <div className="container">
                    <AlertDismissible  />
                    {itens.length > 0 &&
                        <div className="row">
                            <main className="col-md-9">
                                <div className="card">

                                    <table className="table table-borderless table-shopping-cart">
                                        <thead className="text-muted">
                                            <tr className="small text-uppercase">
                                                <th scope="col">Produto</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Quantidade</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {itens.map((item, index) => (
                                                <tr key={item.produtoId}>
                                                    <td>
                                                        <figure className="itemside d-flex">
                                                            <div className="aside">
                                                                <Imagem src={Camiseta} alt={item.nome} className="img-sm" />
                                                            </div>
                                                            <figcaption>
                                                                <Link to={`/produtos/${item.produtoId}`}>
                                                                    <h6 className="title text-dark" style={{padding: "10px 0 0 0"}}>
                                                                        {item.nome}
                                                                    </h6>
                                                                    <p className="text-muted small">
                                                                        {item.quantidade}
                                                                    </p>
                                                                </Link>
                                                            </figcaption>
                                                        </figure>
                                                    </td>

                                                    <td>
                                                        <div className="price-wrap">
                                                            <var className="price">
                                                                {CurrencyMask.format(item.valor * item.quantidade)}
                                                            </var>
                                                            <small className="text-muted d-block">
                                                                {CurrencyMask.format(item.valor)} cada
                                                            </small>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <input type="hidden" id="ProdutoId" value={item.produtoId} />

                                                        {/* <div className="text-left">
                                                            <input value={1} />
                                                        </div> */}

                                                        <div className="text-left">
                                                            <div className="input-group w-75">
                                                                <button className="btn btn-primary"
                                                                    onClick={() => {
                                                                        const quantidade = (itens.find(x => x.produtoId === item.produtoId)?.quantidade || 1) -1;
                                                                        //if(quantidade <= 1) return;
                                                                        setItens(currentItem =>
                                                                            produce(currentItem, v => {
                                                                                v[index].quantidade = quantidade;
                                                                            })
                                                                        );
                                                                }}>
                                                                    <FontAwesomeIcon icon={faMinus} />
                                                                </button>
                                                                <input 
                                                                    type="number"
                                                                    value={itens[index]?.quantidade || 1}
                                                                    className="form-control"
                                                                    onChange={x => {
                                                                        let numeroInput: number = parseInt(x.target.value) || 1;
                                                                        if(numeroInput === 0) return;
                                                                        setItens(currentItem =>
                                                                            produce(currentItem, v => {
                                                                                v[index].quantidade = numeroInput;
                                                                            })
                                                                        );
                                                                    }}
                                                                />
                                                                <button className="btn btn-primary"
                                                                    onClick={() => {
                                                                        const quantidade = (itens.find(x => x.produtoId === item.produtoId)?.quantidade || 1) + 1;
                                                                        console.log(quantidade);
                                                                        setItens(currentItem =>
                                                                            produce(currentItem, v => {
                                                                                v[index].quantidade = quantidade;
                                                                            })
                                                                        );
                                                                }}>
                                                                    <FontAwesomeIcon icon={faPlus} />
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </td>

                                                    <td>
                                                        <div className="text-right">
                                                            <button className="btn btn-success" onClick={() => atualizarItem(item.produtoId)}>
                                                                <FontAwesomeIcon icon={faSync} />
                                                            </button>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div>

                                                            <button className="btn btn-danger" onClick={() => deletarItem(item.produtoId)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>

                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="card-body border-top d-flex justify-content-between">
                                                
                                                <Link to={"#"} className="btn btn-secondary">
                                                    <FontAwesomeIcon icon={faChevronLeft} />
                                                    Continuar Comprando
                                                </Link>
                                                <Link to={"#"} className="btn btn-primary float-md-right">
                                                    Finalizar Compra
                                                    <FontAwesomeIcon icon={faChevronRight} />
                                                </Link>
                                    </div>

                                </div>
                            </main>

                            <aside className="col-md-3">

                                <div className=" card mb-3">
                                    <div className="card-body">

                                        <div className="form-group">
                                            <label>
                                                Possui um Cupom?
                                            </label>

                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Cupom Desconto" />
                                                <span className="input-group-append">
                                                    <button className="btn btn-primary">
                                                        Aplicar
                                                    </button>
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <dl className="dlist-align">
                                            <dt>
                                                Valor Total:
                                            </dt>
                                            <dd className="text-right">
                                                {CurrencyMask.format(data.valorTotal)}
                                            </dd>
                                        </dl>

                                        <dl className="dlist-align">
                                            <dt>
                                                Desconto:
                                            </dt>
                                            <dd className="text-right">
                                                {CurrencyMask.format(0)}
                                            </dd>
                                        </dl>

                                        <dl className="dlist-align">
                                            <dt>
                                                Total:
                                            </dt>
                                            <dd className="text-right">
                                                {CurrencyMask.format(data.valorTotal)}
                                            </dd>
                                        </dl>
                                        <hr />

                                        <p className="text-center mb-3">
                                                <img src={FormaPagamento} height={26} />
                                        </p>
                                    </div>
                                </div>

                            </aside>

                        </div>
                    }

                    {!(itens.length > 0) &&
                        <div className="text-center">
                            <div className="row">
                                <div className="col  align-self-center">
                                    <img src="https://w7.pngwing.com/pngs/1008/303/png-transparent-shopping-cart-icon-product-return-shopping-cart-retail-supermarket-objects.png" style={{height: 100, width: 250}} />
                                    <br /><br />

                                    <h4>
                                        Seu carrinho está vazio
                                    </h4>
                                    <h5>
                                        Vá para a <Link to={"/"}>página inicial</Link> e confira nossos produtos.
                                    </h5>
                                </div>
                            </div>
                        </div>
                    }
            
            </div>
        </section>
        </MainContent>
    );
};
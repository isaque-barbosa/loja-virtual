import { Link } from "react-router-dom";
import { MainContent } from "../../components/MainContent";
import { Carregando } from "../../components/Carregando";

import { useFetch } from "../../hooks/useFetch";
import { CurrencyMask } from "../../services/mask";
import api, { comprasBffUrl } from "../../services/api";

import { IProduto } from "../Produto/index";
import { Item } from "../Carrinho";

import { catalogoUrl } from "../../services/api";

export const Home: React.FC = () => {
    const { data } = useFetch<IProduto[]>(`${catalogoUrl}catalogo/produtos`);
    
    if(!data){
        return(
            <Carregando />
        );
    }

    function comprar(item: Item) {
        return (event: React.MouseEvent) => {
            api.post(`${comprasBffUrl}compras/carrinho/items`, item)
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
            });;
            event.preventDefault();
        }
    };

    function converter(produto: IProduto){
        const item = {
            produtoId: produto.id,
            nome: produto.nome,
            quantidade: 1,
            valor: produto.valor
        } as Item;
        
        return item;
    };

    return(
        <MainContent>
            <div className="row m-3">
                {data.map(produto => (
                    <div key={produto.id} className="col-sm-2 mt-3">
                        <div className="card">
                            <Link to={`/produtos/${produto.id}`}>
                                <img src="https://a-static.mlcdn.com.br/1500x1500/camisa-social-masculina-manga-longa-slim-botoes-duplo-azul-ceu-us-born/estilomodas/5245901416/a06bff7439beadf189edda14611bff20.jpg" className="card-img-top" alt={produto.descricao} />
                            </Link>
                            <div className="card-body">
                                <h6 className="card-title">
                                    {produto.nome}
                                </h6>
                                <p className="card-text">
                                    {CurrencyMask.format(produto.valor)}
                                </p>
                                
                                <button onClick={comprar(converter(produto))}
                                      style={{width: "100%"}}
                                      className="btn btn-primary">
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </MainContent>
    );
};
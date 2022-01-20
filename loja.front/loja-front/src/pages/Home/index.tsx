import { Link } from "react-router-dom";
import { MainContent } from "../../components/MainContent";

import { useFetch } from "../../hooks/useFetch";
import { CurrencyMask } from "../../services/mask";
import { IProduto } from "../Produto/index";
import { catalogoUrl } from "../../services/api";

export const Home: React.FC = () => {
    const { data } = useFetch<IProduto[]>(`${catalogoUrl}catalogo/produtos`);
    
    if(!data){
        return(
            <MainContent>
                <p>Carregando...</p>
            </MainContent>
        );
    }

    return(
        <MainContent>
            <div className="row">
                {data.map(produto => (
                    <div className="col-sm-2">
                        <div className="card">
                            <Link to={`/produtos/${produto.id}`}>
                                <img src="https://a-static.mlcdn.com.br/1500x1500/camisa-social-masculina-manga-longa-slim-botoes-duplo-azul-ceu-us-born/estilomodas/5245901416/a06bff7439beadf189edda14611bff20.jpg" className="card-img-top" alt={produto.descricao} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">
                                    {produto.nome}
                                </h5>
                                <p className="card-text">
                                    {CurrencyMask.format(produto.valor)}
                                </p>
                                
                                <Link to={`/produtos/${produto.id}`} className="btn btn-primary pull-right">
                                    Comprar
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </MainContent>
    );
};
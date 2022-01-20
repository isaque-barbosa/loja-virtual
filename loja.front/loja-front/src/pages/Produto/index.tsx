import { useParams } from "react-router-dom";
import { MainContent } from "../../components/MainContent";

import { useFetch } from "../../hooks/useFetch";
import { CurrencyMask } from "../../services/mask";
import { catalogoUrl } from "../../services/api";

export interface IProduto {
    id: string;
    nome: string;
    categoria: string;
    descricao: string;
    ativo: boolean;
    valor: number;
    dataCadastro: Date;
    imagem: string;
    quantidadeEstoque: number;
}

export const Produto: React.FC = () => {
    const { id } = useParams();

    const { data } = useFetch<IProduto>(`${catalogoUrl}catalogo/produtos/${id}`);

    console.log(data);
    if(!data){
        return <p>Carregando...</p>
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
                        <div className="card-body">
                            
                            <h5 className="card-title">
                                {data.nome}
                            </h5>
                            <p className="card-text">
                                {data.descricao}
                            </p>
                            <p className="card-text">
                                {CurrencyMask.format(data.valor)}
                            </p>
                            
                        </div>
                    </div>

                </div>                
            </div>
        </MainContent>
    );
};
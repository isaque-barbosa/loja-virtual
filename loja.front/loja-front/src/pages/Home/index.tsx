import { Link } from "react-router-dom";
import { MainContent } from "../../components/MainContent";

import { useFetch } from "../../hooks/useFetch";
import { CurrencyMask } from "../../services/mask";
import { IProduto } from "../Produto/index";

import { Card, Container, Column, Row } from "./style";

export const Home: React.FC = () => {
    const { data } = useFetch<IProduto[]>("https://localhost:44391/catalogo/produtos");
    
    if(!data){
        return <p>Carregando...</p>
    }

    return(
        <MainContent>
            <Row className="row">
                {data.map(produto => (
                    <Column key={produto.id} className="column col-md-4">
                        <Link to={`/produtos/${produto.id}`}>
                            <Card className="card" >
                                <img src="https://a-static.mlcdn.com.br/1500x1500/camisa-social-masculina-manga-longa-slim-botoes-duplo-azul-ceu-us-born/estilomodas/5245901416/a06bff7439beadf189edda14611bff20.jpg" alt={produto.descricao} />
                                <Container className="container">
                                    <h4><b>{produto.nome}</b></h4>
                                    <p>{CurrencyMask.format(produto.valor)}</p>
                                </Container>
                            </Card>
                        </Link>
                    </Column>
                ))}
            </Row>
        </MainContent>
    );
};
import { MainContent } from "../../components/MainContent";

import { useFetch } from "../../hooks/useFetch";
import { CurrencyMask } from "../../services/mask";

import { Card, Container, Column, Row } from "./style";

interface Produto {
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

export const Home: React.FC = () => {
    //const { data } = useFetch<Produto[]>(`http://localhost:5001/api/produto/detalhes/${id}`);
    const { data } = useFetch<Produto[]>("https://localhost:44391/catalogo/produtos");
    
    console.log(data);
    if(!data){
        return <p>Carregando...</p>
    }

    return(
        <MainContent>
            <Row className="row">
                {data.map(produto => (
                    <Column key={produto.id} className="column col-md-4">
                        <Card className="card">
                            <img src="https://a-static.mlcdn.com.br/1500x1500/camisa-social-masculina-manga-longa-slim-botoes-duplo-azul-ceu-us-born/estilomodas/5245901416/a06bff7439beadf189edda14611bff20.jpg" alt={produto.descricao} />
                            <Container className="container">
                                <h4><b>{produto.nome}</b></h4>
                                <p>{CurrencyMask.format(produto.valor)}</p>
                            </Container>
                        </Card>
                    </Column>
                ))}
            </Row>
        </MainContent>
    );
};
import { useParams } from "react-router-dom";
import { MainContent } from "../../components/MainContent";

import { useFetch } from "../../hooks/useFetch";
import { CurrencyMask } from "../../services/mask";

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
    console.log(id);

    const { data } = useFetch<IProduto>(`https://localhost:44391/catalogo/produtos/${id}`);

    console.log(data);
    if(!data){
        return <p>Carregando...</p>
    }

    return(
        <MainContent>

        </MainContent>
    );
};
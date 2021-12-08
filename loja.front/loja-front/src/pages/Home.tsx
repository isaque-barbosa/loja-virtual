import { MainContent } from "../hooks/MainContent";

// export const Home: React.FC = () => {
//     //const { data } = useFetch<Produto[]>(`http://localhost:5001/api/produto/detalhes/${id}`);
//     const { data } = useFetch<Produto[]>("api/produto/listar");

//     if(!data){
//         return <p>Carregando...</p>
//     }

//     return(
//         <MainContent>
//             <ul>
//                 {data.map(produto => (
//                     <li key={produto.id}>
//                         <label>{produto.nome}</label>
//                     </li>
//                 ))}
//             </ul>
//         </MainContent>
//     );
// };

export function Home(){

    return(
        <MainContent>
            <div>
                <h1>Produtos</h1>
            </div>
        </MainContent>
    );
}
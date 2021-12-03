import React from "react";

import { MainContent } from "../hooks/MainContent";
import { useFetch } from "../hooks/useFetch";

interface User {
    id: number;
    name: string;
}

export const LogIn: React.FC = () => {
    const {} = useFetch<User>("api/login");

    return(
        <MainContent>
            <div>
                <form>
                    <label>E-mail</label>
                    <input />
                    <label>Senha</label>
                    <input />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </MainContent>
    );
};

// export function Login(){
//     const {} = useFetch<User>("http://localhost:5001/api/login");


//     return(
//         <MainContent>
//             <div>
//                 <form>
//                     <label>E-mail</label>
//                     <input />
//                     <label>Senha</label>
//                     <input />
//                     <button type="submit">Entrar</button>
//                 </form>
//             </div>
//         </MainContent>
//     );
// }
import { MainContent } from "./MainContent";

export function Carregando(){
    return(
        <MainContent>
            <div className="text-center m-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
        </MainContent>
    );
}
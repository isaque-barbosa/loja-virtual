import { useState } from "react";
import { Alert } from "react-bootstrap";

// const [showAlert, setShowAlert] = useState(false);
// const [alertProps, setAlertProps] = useState<AlertProps>();

let showAlert = false;
let alertProps: AlertProps;

export interface AlertProps{
    tipo: string;
    titulo: string;
    mensagens: string[] | undefined;
}

export function setAlert(tipo: string, titulo: string, mensagens: string[] | undefined){
    // setAlertProps({
    //     tipo: tipo,
    //     titulo: titulo,
    //     mensagens: mensagens
    // } as AlertProps);
    alertProps = {
        tipo: tipo,
        titulo: titulo,
        mensagens: mensagens
    } as AlertProps;

    //setShowAlert(true);
    showAlert = true;
}

export function AlertDismissible(){

      return (
        <Alert variant={alertProps?.tipo} hidden={!showAlert} onClose={() => /*setShowAlert(false)*/ showAlert = false} dismissible>
            <Alert.Heading>{alertProps?.titulo}</Alert.Heading>
                {alertProps?.mensagens?.map((error, i) => {
                    return <li key={i}>{error}</li> 
                })}
        </Alert>
      );
}
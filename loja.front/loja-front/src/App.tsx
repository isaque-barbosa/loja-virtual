import { Home } from "./pages/Home";
import { LogIn } from "./pages/Login";
import { Registrar } from "./pages/Registrar";
import { Carrinho } from "./pages/Carrinho";

import { isAuthenticated } from './services/auth';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./styles/global.css";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Navigate to={{ pathname: "/", state: { from: props.location } }} />
//       )
//     }
//   />
// );

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/registrar" element={<Registrar />} />
      <Route path="/carrinho" element={isAuthenticated() ? <Carrinho /> : <LogIn />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

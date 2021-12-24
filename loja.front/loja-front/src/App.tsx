import { Home } from "./pages/Home/index";
import { LogIn } from "./pages/Login/index";
import { Registrar } from "./pages/Registrar/index";
import { Carrinho } from "./pages/Carrinho";

import { isAuthenticated } from './services/auth';

import { BrowserRouter, Route, Routes} from "react-router-dom";

import "./styles/global";
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <BrowserRouter>
    <GlobalStyle />
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

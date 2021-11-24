import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

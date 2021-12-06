import { Home } from "./pages/Home";
import { LogIn } from "./pages/Login";

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
    </Routes>
    </BrowserRouter>
  );
}

export default App;

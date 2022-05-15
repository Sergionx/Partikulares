import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

import ConfirmAccount from "./pages/user/ConfirmAccount";
import Error404 from "./pages/Error404";
import ForgotPassword from "./pages/user/ForgotPassword";
import Login from "./pages/user/Login";
import NewPassword from "./pages/user/NewPassword";
import Register from "./pages/user/Register";
import Shop from "./pages/shop/Shop";
import NewProduct from "./pages/shop/NewProduct";

import { AuthProvider } from "./context/AuthProvider";
import ProductDetails from "./pages/shop/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/user" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Register />} />
            <Route path="olvide-password" element={<ForgotPassword />} />
            <Route path="olvide-password/:token" element={<NewPassword />} />
            <Route path="confirmar/:id" element={<ConfirmAccount />} />
            <Route path="*" element={<Error404 />} /> //TODO - Crear una pagina
            404
          </Route>

          <Route path="/" element={<RutaProtegida />}>
            <Route index element={<Shop />} />
            <Route path="crear-producto" element={<NewProduct />} /> //TODO
            -Crear una pagina de crear producto
            <Route path=":title" element={<ProductDetails />} />
            <Route path="*" element={<Error404 />} /> //TODO - Crear unapagina
            404
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

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
import ProductDetails from "./pages/shop/ProductDetails";
import CartCheckout from "./pages/shop/CartCheckout";

import { AuthProvider } from "./context/AuthProvider";
import Compra from "./pages/compra/Compra";

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
            de error 404
          </Route>

          <Route path="/shop" element={<RutaProtegida />}>
            <Route index element={<Shop />} />
            <Route path="crear-producto" element={<NewProduct />} />
            <Route path=":id" element={<ProductDetails />} />
            <Route path="*" element={<Error404 />} /> //TODO - Crear una pagina
            de error 404
          </Route>

          <Route path="/cart" element={<RutaProtegida />}>
            <Route path="" element={<CartCheckout />} />
            <Route path="*" element={<Error404 />} /> //TODO - Crear una pagina
            de error 404
          </Route>

          <Route path="/compra" element={<RutaProtegida />}>
            <Route path="" element={<Compra />} />
            <Route path="*" element={<Error404 />} /> //TODO - Crear una pagina
            de error 404
          </Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

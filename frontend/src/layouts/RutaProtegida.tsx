import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { CartProvider } from "../context/CartProvider";
import { ProductProvider } from "../context/ProductProvider";
import useAuth from "../hooks/useAuth";

function RutaProtegida() {
  const { auth, cargando } = useAuth();

  if (cargando) return <p>Cargando</p>;
  //TODO- Arreglar sidebar cuando la pantalla se hace chica (en especial telefonos)
  return (
    <CartProvider>
      <ProductProvider>
        {auth._id ? (
          <div className="bg-green-50">
            <Header />
            <div className="md:flex md:min-h">
              <SideBar />
              <main className="p-3 flex-1 ">
                <Outlet />
              </main>
            </div>
          </div>
        ) : (
          <div className="bg-green-50">
            <Header />
            <div className="md:flex md:min-h">
              <SideBar />
              <main className="p-3 flex-1 ">
                <Outlet />
              </main>
            </div>
          </div>
          
        )}
      </ProductProvider>
    </CartProvider>
  );
}

export default RutaProtegida;

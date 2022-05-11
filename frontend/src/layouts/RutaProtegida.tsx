import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import useAuth from "../hooks/useAuth";
import IAuth from "../interfaces/IAuth";

function RutaProtegida() {
  const { auth, cargando } = useAuth();

  if (cargando) return <p>Cargando</p>;
  //TODO - Arreglar sidebar cuando la pantalla se hace chica (en especial telefonos)
  return (
    <>
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
        <Navigate to="/user" />
      )}
    </>
  );
}

export default RutaProtegida;

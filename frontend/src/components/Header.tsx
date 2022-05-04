import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-3xl text-center text-green-400 font-black">
          Partikulares
        </h2>

        <input
          type="search"
          placeholder="Buscar Producto"
          className="rounded-lg lg:w-96 block p-2 border"
        />

        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold">
            Partikulares
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-green-700 p-3
              rounded-md font-bold"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

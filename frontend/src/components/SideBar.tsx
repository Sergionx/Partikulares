import React from 'react';
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function SideBar() {
  const { auth } = useAuth();

  return (
    <aside>
      <div className="flex flex-col h-screen">
        <p className="text-xl font-bold">Hola: {auth.name}</p>

        <Link to="" className="text-center mt-5">
          Bolsas
        </Link>
      </div>
    </aside>
  );
}

export default SideBar;

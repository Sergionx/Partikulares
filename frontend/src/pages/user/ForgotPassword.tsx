import axiosClient from "../../config/axiosClient";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import IAlerta from "../../interfaces/IAlert";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState<IAlerta>({ msg: "", error: false });

  async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email == "") {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
    }

    try {
      const { data } = await axiosClient.post("/users/olvide-password", {
        email,
      });

      console.log(data.msg);
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setEmail("");
    } catch (error: any) {
      console.log(error);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-green-400 text-center font-black text-6xl capitalize">
        Cambia tu contraseña
      </h1>

      {msg && <Alert alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleForgotPassword}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de su cuenta"
            className="border-b-2 border-green-400 w-full mt-3 p-3 border rounded-xl bg-gray-50"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar instrucciones"
          className="bg-green-500 w-full py-3 text-white font-bold uppercase rounded hover:cursos-pointer hover:cursor-pointer hover:bg-green-600 transition-colors mb-5"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/user"
        >
          Ya tienes una cuenta?{" "}
          <span className="text-green-400">Inicia sesión</span>
        </Link>

        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/user/registrar"
        >
          No tienes una cuenta?{" "}
          <span className="text-green-400">Registrate</span>
        </Link>
      </nav>
    </>
  );
}

export default ForgotPassword;

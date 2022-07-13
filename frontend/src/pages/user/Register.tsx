import axiosClient from "../../config/axiosClient";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import IAlerta from "../../interfaces/IAlert";
import useCart from "../../hooks/useCart";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState<IAlerta>({ msg: "", error: false });

  const { createCart } = useCart();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if ([name, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }
    // Creando el usuario en la API
    try {
      const { data } = await axiosClient.post(`/users`, {
        name,
        email,
        password,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });

      createCart()
    } catch (error: any) {
      console.log(error);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }

    setName("");
    setEmail("");
    setPassword("");
    setRepetirPassword("");

    return;
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-green-400 text-center font-black text-6xl capitalize">
        Crea tu cuenta
      </h1>

      {msg && <Alert alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="name"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ingrese su nombre"
            className="border-b-2 border-green-400 w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
            placeholder="Ingrese su email"
            className="border-b-2 border-green-400 w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            className="border-b-2 border-green-400 w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repetir contraseña
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Ingrese su contraseña otra vez"
            className="border-b-2 border-green-400 w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear cuenta"
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
          to="/user/olvide-password"
        >
          Olvidé mi contraseña <span className="text-green-400">Cambiar</span>
        </Link>
      </nav>
    </>
  );
}

export default Register;

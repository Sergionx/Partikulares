import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import IAlerta from "../../interfaces/IAlert";
import axiosClient from "../../config/axiosClient";
import Alert from "../../components/Alert";
import useAuth from "../../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState<IAlerta>({ msg: "", error: false });

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Logueando el usuario en la API
    try {
      const { data } = await axiosClient.post("/users/login", {
        email,
        password,
      });
      
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setEmail("");
      setPassword("");

      localStorage.setItem("token", data.token); // TODO - Guardar el token como una cookie
      setAuth(data);
      navigate("/shop"); //TODO - Redireccionar al home
      // TODO - Penasar si el carrito del usuario será el que tenga guardado o el nuevo
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
        Inicia sesión
      </h1>

      {msg && <Alert alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleLogin}
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

        <input
          type="submit"
          value="Iniciar Sesión"
          className='bg-green-500 w-full py-3 text-white font-bold uppercase rounded 
          hover:cursos-pointer hover:cursor-pointer hover:bg-green-600 transition-colors mb-5'
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/user/registrar"
        >
          No tienes una cuenta?{" "}
          <span className="text-green-400">Registrate</span>
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

export default Login;

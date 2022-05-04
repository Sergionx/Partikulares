import axiosClient from "../../config/axiosClient";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import IAlert from "../../interfaces/IAlert";

function NewPassword() {
  const [contrasena, setContrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [nuevoPassword, setNuevoPassword] = useState(false);

  const [alert, setAlert] = useState<IAlert>({ msg: "", error: false });

  const params = useParams();
  const { token } = params;

  let navigate = useNavigate();

  useEffect(() => {
    async function confirmarToken() {
      try {
        await axiosClient.get(`/users/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error: any) {
        setAlert({
          msg: "Su token no es valido",
          error: true,
        });
      }
    }
    confirmarToken();
  }, []);

  async function handleNewPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!tokenValido) {
      setAlert({
        msg: "Su token no es valido",
        error: true,
      });
      return;
    }

    if ([contrasena, repetirContrasena].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (contrasena !== repetirContrasena) {
      setAlert({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }

    if (contrasena.length < 6) {
      setAlert({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post(
        `/users/olvide-password/${token}`,
        {
          token: token,
          password: contrasena,
        }
      );

      setAlert({
        msg: data.msg,
        error: false,
      });

      setContrasena("");
      setRepetirContrasena("");
      setNuevoPassword(true);

      navigate("/login");
    } catch (error: any) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }

  const { msg } = alert;

  return (
    <>
      <h1 className="text-green-400 text-center font-black text-6xl capitalize">
        Reestablece tu contraseña
      </h1>

      {msg && <Alert alerta={alert} />}
      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg px-10 py-5"
          onSubmit={handleNewPassword}
        >
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
              placeholder="Ingrese su nueva contraseña"
              className="border-b-2 border-green-400 w-full mt-3 p-3 border rounded-xl bg-gray-50"
              onChange={(e) => setContrasena(e.target.value)}
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
              onChange={(e) => setRepetirContrasena(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar nueva contraseña"
            className="bg-green-500 w-full py-3 text-white font-bold uppercase rounded hover:cursos-pointer hover:cursor-pointer hover:bg-green-600 transition-colors mb-5"
          />
        </form>
      )}

      <Link
        className="block text-center my-5 text-slate-500 text-sm"
        to="/user"
      >
        Inicia sesión
      </Link>
    </>
  );
}

export default NewPassword;

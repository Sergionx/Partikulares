import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import Alert from "../../components/Alert";
import IAlerta from "../../interfaces/IAlert";

// TODO - Arreglar useEffect se ejecuta dos veces
function ConfirmAccount() {
  const [alerta, setAlerta] = useState<IAlerta>({ msg: "", error: false });
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams();
  const { id } = params;

  let navigate = useNavigate();

  useEffect(() => {
    async function confirmarCuenta() {
      try {
        const { data } = await axiosClient.get(`/users/confirmar/${id}`);

        setAlerta({
          msg: data.msg,
          error: false,
        });
        setCuentaConfirmada(true);

        setTimeout(() => {
          navigate("/user");
        }, 3000);
      } catch (error: any) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    }
    confirmarCuenta();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-green-400 text-center font-black text-6xl capitalize">
        Confirma tu cuenta
      </h1>

      <div className="mt-30 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            className="block text-center my-5 text-slate-500 text-sm"
            to="/user"
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
}

export default ConfirmAccount;

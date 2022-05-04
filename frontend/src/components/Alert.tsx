import React from "react";
import IAlerta from "../interfaces/IAlert";


function Alert({alerta} : { alerta: IAlerta }) {
  return (
    <div
      className={`${
        alerta.error ? "from-red-400 to-red-600" : "from-green-400 to-green-600"
      } bg-gradient-to-br rounded-xl p-3 text-center my-10 font-bold text-sm text-white`}
    >
      {alerta.msg}
    </div>
  );
}

export default Alert;

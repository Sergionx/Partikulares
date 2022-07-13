import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import IAuth from "../interfaces/IAuth";
import IAuthProvider from "../interfaces/providers/IAuthProvider";
import { IProps } from "../interfaces/IProps";

const AuthContext = createContext<IAuthProvider>({
  setAuth: () => {},
  auth: {
    email: "",
    isAdmin: false,
    name: "",
    _id: "",
  },
  cargando: true,
});

function AuthProvider({ children }: IProps) {
  const [auth, setAuth] = useState<IAuth>({
    email: "",
    isAdmin: false,
    name: "",
    _id: "",
  });
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate()

  const value: IAuthProvider = { setAuth, auth, cargando };

  useEffect(() => {
    async function autenticarUsuario() {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          Content0type: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axiosClient.get("users/perfil", config);
        setAuth(data.usuario);
      } catch (error) {
        setAuth({
          email: "",
          isAdmin: false,
          name: "",
          _id: "",
        });
        console.log(error);
      } finally {
        setCargando(false);
      }
    }
    autenticarUsuario();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };

export default AuthContext;

import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import IAuthProvider from "../interfaces/providers/IAuthProvider";

function useAuth() {
  return useContext<IAuthProvider>(AuthContext);
}

export default useAuth;

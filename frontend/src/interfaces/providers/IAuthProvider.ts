import IAuth from "../IAuth";

interface IAuthProvider {
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>
  auth: IAuth,
  cargando: boolean
}

export default IAuthProvider;
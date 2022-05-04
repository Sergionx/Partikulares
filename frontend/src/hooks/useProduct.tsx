import { useContext } from "react";
import ProductContext from "../context/ProductProvider";
import IAuthProvider from "../interfaces/providers/IAuthProvider";
import IProdcutProvider from "../interfaces/providers/IProductProvider";

function useProduct() {
  return useContext<IProdcutProvider>(ProductContext);
}

export default useProduct;

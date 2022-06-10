import { useContext } from "react";
import ProductContext from "../context/ProductProvider";
import IProductProvider from "../interfaces/providers/IProductProvider";

function useProduct() {
  return useContext<IProductProvider>(ProductContext);
}

export default useProduct;

import { useContext } from "react";
import CartContext from "../context/CartProvider";
import ICartProvider from "../interfaces/providers/ICartProvider";

function useCart() {
  return useContext<ICartProvider>(CartContext);
}

export default useCart;

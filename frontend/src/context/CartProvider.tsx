import React, { createContext, useEffect, useState } from "react";
import ICart from "../../../backend/models/interfaces/ICart";
import { IProps } from "../interfaces/IProps";
import ICartProvider from "../interfaces/providers/ICartProvider";

const CartContext = createContext<ICartProvider>({
  setCart: () => {},
  cart: {
    _id: "",
    products: [{ product: "", quantity: 0 }],
  },
});
//TODO- Considerar meter el carro en AuthProvider
// Si hago eso, el carro a juro depende de un usuario
// y me gustaria que no
function CartProvider({ children }: IProps) {
  const [cart, setCart] = useState<ICart>({
    _id: "",
    products: [{ product: "", quantity: 0 }],
  });

  const value: ICartProvider = { setCart, cart };

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
    else {
      setCart({
        _id: "",
        products: [{ product: "", quantity: 0 }],
      });
    }
  }, [])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider;

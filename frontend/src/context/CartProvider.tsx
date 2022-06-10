
import React, { createContext, useEffect, useState } from "react";
import ICart from "../../../backend/models/interfaces/ICart";
import IProduct from "../../../backend/models/interfaces/IProduct";
import axiosClient from "../config/axiosClient";
import IAlerta from "../interfaces/IAlert";
import { IProps } from "../interfaces/IProps";
import ICartProvider from "../interfaces/providers/ICartProvider";

const CartContext = createContext<ICartProvider>({
  setCart: () => {},
  cart: {
    _id: "",
    user: "",
    products: [{ product: "", quantity: 0 }],
  },
  addProduct: () => {},
});


function CartProvider({ children }: IProps) {
  const [cart, setCart] = useState<ICart>({
    _id: "",
    user: "",
    products: [{ product: "", quantity: 0 }],
  });
  //TODO- meter alerta en cartContext
  const [alerta, setAlerta] = useState<IAlerta>({ msg: "", error: false });

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    } else {
      setCart({
        _id: "",
        user: "",
        products: [{ product: "", quantity: 0 }],
      });
    }
  }, []);

  async function addProduct(product: IProduct) {
    const token = localStorage.getItem("token");
    const cartLS = localStorage.getItem("cart");

    if (!token) {
      // No inición sesión y no puede acceder a un carro en el backend

      if (cartLS) {
        const productIndex = cart.products.findIndex(
          (p) => p.product === product._id
        );

        if (productIndex >= 0) {
          // Si ya esta en el carro, aumento la cantidad por 1
          cart.products[productIndex].quantity += 1;
        } else {
          // Si no esta en el carro, lo añado
          cart.products.push({ product: product._id, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart(cart);
      } else {
        const newCart = {
          _id: "",
          user: "",
          products: [{ product: product._id, quantity: 1 }],
        };
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
      }
      return;
    }
    const config = {
      headers: {
        Content0type: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const carrito = (await axiosClient.get("/carts", config)).data;

      const { data } = await axiosClient.put(
        "/carts",
        { productId: product._id as string },
        config
      );
      setCart(data);
      localStorage.setItem("cart", JSON.stringify(data));

    } catch (error: any) {
      console.log(error);
      console.log(error.response.data.msg)
      if(error.response.data.status === 404){ 

        const { data } = await axiosClient.post(
          "/carts",
          { products: [{ product: product._id!.toString(), quantity: 1 }] },
          config
        );
        setCart(data);
        localStorage.setItem("cart", JSON.stringify(data));
      }
    }
  }

  const value: ICartProvider = { setCart, cart, addProduct };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartProvider };
export default CartContext;

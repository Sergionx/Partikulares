//TODO- Cuando inicie sesión o registre, el carro debe pasar a la BD
//TODO- Considerar guardar el carro como objeto y que solo contenga productos 

import React, { createContext, useEffect, useState } from "react";
import IProduct from "../../../backend/models/interfaces/IProduct";
import axiosClient from "../config/axiosClient";
import IAlerta from "../interfaces/IAlert";
import IProductCart from "../interfaces/IProductCart";
import { IProps } from "../interfaces/IProps";
import ICartProvider from "../interfaces/providers/ICartProvider";

const CartContext = createContext<ICartProvider>({
  productsCart: [],
  addProduct: () => {},
  alertaCart: { msg: "", error: false },
});

function CartProvider({ children }: IProps) {
  const [productsCart, setProductsCart] = useState<IProductCart[]>([]);
  //TODO- meter alerta en cartContext
  const [alertaCart, setAlertaCart] = useState<IAlerta>({
    msg: "",
    error: false,
  });

  useEffect(() => {
    const productsCart = localStorage.getItem("productsCart");
    if (productsCart) {
      setProductsCart(JSON.parse(productsCart));
    } else {
      console.log("hola");
      localStorage.setItem("productsCart", JSON.stringify([]));
      setProductsCart([]);
    }
  }, []);

  function mostrarAlertaCart(alerta: IAlerta) {
    setAlertaCart(alerta);

    setTimeout(() => {
      setAlertaCart({ msg: "", error: false });
    }, 2000);
  }

  async function addProduct(product: IProduct, quantity: number) {
    if (quantity < 1) {
      mostrarAlertaCart({ msg: "La cantidad debe ser mayor a 0", error: true });
      return;
    }

    const token = localStorage.getItem("token");
    const productsCartLS = localStorage.getItem("productsCart");

    if (!token) {
      // No inición sesión y no puede acceder a un carro en el backend

      if (productsCartLS) {
        const productIndex = productsCart.findIndex(
          (p) => p.product === product._id
        );

        if (productIndex >= 0) {
          // Si ya esta en el carro, aumento la cantidad por 1
          const productUpdated = productsCart[productIndex];
          productUpdated.quantity += 1;
          setProductsCart([...productsCart, productUpdated]);
        } else {
          // Si no esta en el carro, lo añado
          setProductsCart((old) => [
            ...old,
            { product: product._id.toString(), quantity: quantity },
          ]);
        }
        localStorage.setItem("productsCart", JSON.stringify(productsCart));
        mostrarAlertaCart({ msg: "Producto añadido al carro", error: false });
      } else {
        setProductsCart([
          ...productsCart,
          { product: product._id.toString(), quantity: quantity },
        ]);
        localStorage.setItem("productsCart", JSON.stringify(productsCart));
        mostrarAlertaCart({ msg: "Producto añadido al carro", error: false });
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

      // El usuario tiene un carro
      const { data } = await axiosClient.put(
        "/carts",
        { productId: product._id as string, quantity: quantity },
        config
      );
      setProductsCart(data.products);
      localStorage.setItem("productsCart", JSON.stringify(data.products));
      mostrarAlertaCart({ msg: "Producto añadido al carro", error: false });
    } catch (error: any) {
      console.log(error);
      console.log(error.response.data.msg);
      if (error.response.data.status === 404) {
        //El usuario no tiene un carro

        const { data } = await axiosClient.post(
          "/carts",
          {
            products: [
              { product: product._id!.toString(), quantity: quantity },
            ],
          },
          config
        );
        setProductsCart(data.products);
        localStorage.setItem("productsCart", JSON.stringify(data.products));
        mostrarAlertaCart({ msg: "Producto añadido al carro", error: false });
      }
    }
  }

  const value: ICartProvider = { productsCart, addProduct, alertaCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartProvider };
export default CartContext;

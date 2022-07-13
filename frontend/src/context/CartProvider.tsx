//TODO- Cuando inicie sesión o registre, 
//el carro del LocalStorage debe pasarse igual a la BD. Vease Review
import React, { createContext, useEffect, useState } from "react";
import IProduct from "../../../backend/models/interfaces/IProduct";
import axiosClient from "../config/axiosClient";
import IAlerta from "../interfaces/IAlert";
import IProductCart from "../interfaces/IProductCart";
import { IProps } from "../interfaces/IProps";
import ICartProvider from "../interfaces/providers/ICartProvider";

const CartContext = createContext<ICartProvider>({
  productsCart: [],
  alertaCart: { msg: "", error: false },
  addProduct: () => {},
  removeProduct: () => {},
  createCart: () => {},
});

function CartProvider({ children }: IProps) {
  const [productsCart, setProductsCart] = useState<IProductCart[]>([]);
  const [alertaCart, setAlertaCart] = useState<IAlerta>({
    msg: "",
    error: false,
  });

  useEffect(() => {
    const productsCart = localStorage.getItem("productsCart");
    if (productsCart) {
      setProductsCart(JSON.parse(productsCart));
    } else {
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

  async function addProduct(productId: string, quantity: number) {
    if (quantity < 1) {
      mostrarAlertaCart({ msg: "La cantidad debe ser mayor a 0", error: true });
      return;
    }

    const token = localStorage.getItem("token");
    const productsCartLS = JSON.parse(
      localStorage.getItem("productsCart")?.toString() || "[]"
    ) as IProductCart[];
    if (!token) {
      // No inición sesión y no puede acceder a un carro en el backend

      const productIndex = productsCart.findIndex(
        (p) => p.product === productId
      );

      if (productIndex >= 0) {
        // Si ya esta en el carro, aumento su cantidad
        productsCartLS[productIndex].quantity += quantity;
        setProductsCart(productsCartLS);
      } else {
        // Si no esta en el carro, lo añado
        const productToAdd = {
          product: productId,
          quantity: quantity,
        } as IProductCart;

        productsCartLS.push(productToAdd);
        setProductsCart((old) => [...old, productToAdd]);
      }
      localStorage.setItem("productsCart", JSON.stringify(productsCartLS));
      mostrarAlertaCart({ msg: "Producto añadido al carro", error: false });
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
        `/carts/${productId}`,
        { quantity: quantity },
        config
      );

      productsCartLS.push({
        product: productId,
        quantity: quantity,
      });

      setProductsCart((old) => [
        ...old,
        { product: productId, quantity: quantity },
      ]);
      localStorage.setItem("productsCart", JSON.stringify(productsCartLS));
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
              { product: productId, quantity: quantity },
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

  async function removeProduct(productId: string) {
    const token = localStorage.getItem("token");
    const productsCartLS = JSON.parse(
      localStorage.getItem("productsCart")?.toString() || "[]"
    ) as IProductCart[];

    productsCartLS.splice(
      productsCartLS.findIndex((p) => p.product === productId),
      1
    );

    if (token) {
      try {
        const config = {
          headers: {
            Content0type: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        await axiosClient.delete(`/carts/${productId}`, config);
        
        setProductsCart(productsCartLS);
      } catch (error: any) {
        mostrarAlertaCart({ msg: error.data.msg, error: true });
        return;
      }
    }
    localStorage.setItem("productsCart", JSON.stringify(productsCartLS));
    mostrarAlertaCart({ msg: "Producto eliminado del carro", error: false });
  }

  //REVIEW- Debug metodo
  //NOTE- Used when productsCartLS needs to pass to the backend
  async function createCart() {
    const token = localStorage.getItem("token");
    const productsCartLS = JSON.parse(
      localStorage.getItem("productsCart")?.toString() || "[]"
    ) as IProductCart[];

    if (!token) {
      mostrarAlertaCart({ msg: "No puedes crear un carro sin iniciar sesión", error: true });
      return;
    }

    const config = {
      headers: {
        Content0type: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axiosClient.post(
        "/carts",
        { products: productsCartLS },
        config
      );
      setProductsCart(data.products);
    } catch (error: any) {
      mostrarAlertaCart({ msg: error.data.msg, error: true });
      return;
    }
  }

  const value: ICartProvider = {
    productsCart,
    alertaCart,
    addProduct,
    removeProduct,
    createCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartProvider };
export default CartContext;

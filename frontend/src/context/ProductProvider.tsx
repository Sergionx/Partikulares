import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ICategory from "../../../backend/models/interfaces/ICategory";
import IProduct from "../../../backend/models/interfaces/IProduct";
import axiosClient from "../config/axiosClient";
import IAlerta from "../interfaces/IAlert";
import { IProps } from "../interfaces/IProps";
import IProductProvider from "../interfaces/providers/IProductProvider";

const ProductContext = createContext<IProductProvider>({
  products: [],
  product: {
    _id: "",
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    image: "",
    categories: [],
  },
  mostrarAlerta: () => {},
  alerta: { msg: "", error: false },
  submitProduct: () => {},
  obtenerProducto: () => {},
});

function ProductProvider({ children }: IProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct>({
    _id: "",
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    image: "",
    categories: [],
  });
  const [alerta, setAlerta] = useState<IAlerta>({ msg: "", error: false });

  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const { data } = await axiosClient.get("/products");
      setProducts(data);
    }

    getProducts();
  }, []);

  function mostrarAlerta(alerta: IAlerta) {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({ msg: "", error: false });
    }, 4000);
  }

  async function submitProduct(product: IProduct, categorias: ICategory[]) {
    const token = localStorage.getItem("token");
    if (!token) {
      mostrarAlerta({
        msg: "No tienes permisos para realizar esta acción",
        error: true,
      });
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
        "/products",
        {
          title: product.title,
          description: product.description,
          price: product.price,
          image: product.image,
          categories: categorias,
        },
        config
      );

      categorias.forEach(async (categoria) => {
        await axiosClient.post(
          `categories/${categoria._id.toString()}/products`,
          {
            productId: data._id,
          }
        );
      });

      setProducts([...products, data]);

      window.scrollTo(0, 0);
      setAlerta({
        msg: "Su producto ha sido creado con éxito",
        error: false,
      });

      setTimeout(() => {
        setAlerta({ msg: "", error: false });
        navigate("/");
      }, 3000);
    } catch (error: any) {
      console.log(error);
      mostrarAlerta({
        msg: "No se pudo crear el producto",
        error: true,
      });
    }
  }

  async function obtenerProducto(productId: string) {
    try {
      const { data } = await axiosClient.get(`/products/${productId}`);
      setProduct(data);
    } catch (error: any) {
      setAlerta({
        msg: "No se pudo obtener el producto",
        error: true,
      });
    }
  }

  const value: IProductProvider = {
    products,
    product,
    mostrarAlerta,
    alerta,
    submitProduct,
    obtenerProducto,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export { ProductProvider };

export default ProductContext;

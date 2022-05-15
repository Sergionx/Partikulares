import React, { createContext, useEffect, useState } from "react";
import IProduct from "../../../backend/models/interfaces/IProduct";
import axiosClient from "../config/axiosClient";
import { IProps } from "../interfaces/IProps";
import IProductProvider from "../interfaces/providers/IProductProvider";

const ProductContext = createContext<IProductProvider>({
  products: [],
});

function ProductProvider({ children }: IProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  
  useEffect(() => {
    async function getProducts() {
      const { data } = await axiosClient.get("/products");
      setProducts(data);
    }

    getProducts();
  }, [])

  const value: IProductProvider = { products };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export { ProductProvider };

export default ProductContext;

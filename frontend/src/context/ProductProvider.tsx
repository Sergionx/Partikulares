import React, { createContext, useEffect, useState } from "react";
import IProduct from "../../../backend/models/interfaces/IProduct";
import { IProps } from "../interfaces/IProps";
import IProductProvider from "../interfaces/providers/IProductProvider";

const ProductContext = createContext<IProductProvider>({
  products: [],
});

function ProductProvider({ children }: IProps) {
  const [products, setProducts] = useState<IProduct[]>([]);

  const value: IProductProvider = { products };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export { ProductProvider };

export default ProductContext;

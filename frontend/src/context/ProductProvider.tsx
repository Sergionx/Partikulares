import React, { createContext, useEffect, useState } from "react";
import IProduct from "../interfaces/IProduct";
import { IProps } from "../interfaces/IProps";
import IProdcutProvider from "../interfaces/providers/IProductProvider";

const ProductContext = createContext<IProdcutProvider>({
  products: [],
});

function ProductProvider({ children }: IProps) {
  const [products, setProducts] = useState<IProduct[]>([]);

  const value: IProdcutProvider = { products };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export { ProductProvider };

export default ProductContext;

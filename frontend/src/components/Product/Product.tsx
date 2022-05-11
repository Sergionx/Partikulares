import React from "react";
import useProduct from "../../hooks/useProduct";

function Product() {
  const { products } = useProduct();
  return <div>Product</div>;
}

export default Product;

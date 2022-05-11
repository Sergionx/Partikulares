import React, { useState, useEffect } from "react";
import useProduct from "../../hooks/useProduct";

export function Shop() {
  const {products} = useProduct();
  console.log(products);
  return (
    <>
      <h1 className="text-4xl font-black">Productos</h1>

      <div></div>
    </>
  );
}

export default Shop;

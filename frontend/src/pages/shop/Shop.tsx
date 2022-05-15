import React, { useState, useEffect } from "react";
import ProductCard from "../../components/Product/ProductCard";
import useProduct from "../../hooks/useProduct";

export function Shop() {
  const { products } = useProduct();
  console.log(products);
  let hola =
    "min-h screen bg-gray-200 flex items-center justify-center antialiased";
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-black text-center">Productos</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id.toString()} className="group relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;

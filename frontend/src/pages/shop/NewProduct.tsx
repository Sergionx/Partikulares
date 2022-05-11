import React from "react";
import ProductForm from "../../components/Product/ProductForm";

function NewProduct() {
  return (
    <>
      <h1 className="text-4xl font-black text-center">Crear producto</h1>

      <div className="mt-10 flex justify-center">
        <ProductForm />
      </div>
    </>
  );
}

export default NewProduct;

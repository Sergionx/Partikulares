import React from "react";
import ProductForm from "../../components/ProductForm";

function NewProduct() {
  return (
    <>
      <h1 className="text-4xl font-black">Crear producto</h1>

      <div className="mt-10 flex justify-center">
        <ProductForm />
      </div>
    </>
  );
}

export default NewProduct;

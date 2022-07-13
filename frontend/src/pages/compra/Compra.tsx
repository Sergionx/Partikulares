import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import IProduct from "../../../../backend/models/interfaces/IProduct";
import CartProduct from "../../components/Cart/CartProduct";

interface IState {
  products: { product: IProduct; quantity: number }[];
  totalPrice: number;
}

function Compra() {
  const location = useLocation();
  const state = location.state as IState;
  const { products, totalPrice } = state;

//TODO- Utlizar una carta para los productos que no se puedan borrar
  return (
    <>
      <div className="flex flex-row">
        <ul className="basis-1/2">
          <div className="flex flex-col gap-y-10 my-7 ">
            {products.map((p) => (
              <div key={p.product._id.toString()} className="group relative">
                <CartProduct
                  product={p.product}
                  quantity={p.quantity}
                ></CartProduct>
              </div>
            ))}
          </div>
        </ul>
        <div className="basis-1/2">

        </div>
      </div>
    </>
  );
}

export default Compra;

//TODO - Make it impossible to access this page if no token is present
//FIXME - Si modifico un producto, no se refleja aca
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import IProduct from "../../../../backend/models/interfaces/IProduct";
import CartProduct from "../../components/Cart/CartProduct";
import axiosClient from "../../config/axiosClient";

interface IState {
  products: { product: IProduct; quantity: number }[];
  totalPrice: number;
}

function Compra() {
  const location = useLocation();
  const state = location.state as IState;
  const { products, totalPrice } = state;

  async function handleBuyBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Compra realizada");
  }

  async function handlePaypalBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Content0type: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const {data} = await axiosClient.post(`/orders/paypal`, {products}, config);
    console.log(data)
    window.location.href = data.links[1].href;

  }
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
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleBuyBtn}
          >
            COMPRAR YA
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePaypalBtn}
          >
            PAYPAL
          </button>
        </div>
      </div>
    </>
  );
}

export default Compra;

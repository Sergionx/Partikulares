import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IProduct from "../../../../backend/models/interfaces/IProduct";
import CartProduct from "../../components/Cart/CartProduct";
import axiosClient from "../../config/axiosClient";
import useCart from "../../hooks/useCart";

interface ICartCheckoutProduct {
  product: IProduct;
  quantity: number;
}

function CartCheckout() {
  const [completeProducts, setCompleteProducts] = useState<
    ICartCheckoutProduct[]
  >([]);

  const { productsCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function obtenerProductos() {
      productsCart.forEach(async (p) => {
        const { data } = await axiosClient.get(`/products/${p.product}`);
        setCompleteProducts((old) => [
          ...old,
          { product: data, quantity: p.quantity },
        ]);
        setTotalPrice((old) => old + data.price * p.quantity);
      });
    }

    if (productsCart.length > 0) {
      setCompleteProducts([]);
      setTotalPrice(0);
      obtenerProductos();
    }
  }, [productsCart]);

  //TODO- Pasar este metodo a ProductDetails
  async function handleBuy(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user");
      return;
    }
    navigate("/compra", { state: { products: completeProducts, totalPrice } });
  }

  return (
    <>
      <h1 className="text-center font-bold text-2xl">Carrito</h1>
      <div className="flex flex-row">
        <ul className="basis-3/4">
          <div className="flex flex-col gap-y-10 my-7 ">
            {completeProducts.map((p) => (
              <div key={p.product._id.toString()} className="group relative">
                <CartProduct
                  product={p.product}
                  quantity={p.quantity}
                ></CartProduct>
              </div>
            ))}
          </div>
        </ul>
        <div className="ml-4 my-7 basis-1/4">
          <h3 className="text-center text-xl">Precio total {totalPrice} $</h3>
          <button
            type="button"
            className="w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center
              justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
            onClick={handleBuy}
          >
            COMPRAR YA
          </button>
        </div>
      </div>
    </>
  );
}

export default CartCheckout;

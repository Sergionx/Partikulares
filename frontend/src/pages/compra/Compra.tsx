import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import IProduct from "../../../../backend/models/interfaces/IProduct";

interface IState {
  products: {product: IProduct, quantity: number}[];
  totalPrice: number
}

function Compra() {
  const location = useLocation();
  const state = location.state as IState
  const { products, totalPrice } = state;

  return <div>Compra</div>;
}

export default Compra;

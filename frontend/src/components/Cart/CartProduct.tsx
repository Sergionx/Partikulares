import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IProduct from "../../../../backend/models/interfaces/IProduct";
import useCart from "../../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface IPropsCartProduct {
  product: IProduct;
  quantity: number;
}

function CartProduct(props: IPropsCartProduct) {
  const navigate = useNavigate();
  const { removeProduct } = useCart();

  function handleImageClick() {
    navigate(props.product._id.toString());
  }

  async function handleRemoveFromCart(
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) {
    e.preventDefault();
    try {
      removeProduct(props.product._id.toString());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-row bg-white border-2">
        <div className="bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 basis-1/4">
          <img
            src={props.product.imageUrl as string}
            className="hover:cursor-pointer"
            onClick={handleImageClick}
          />
        </div>

        <div className="basis-8/12">
          <h2 className="text-lg text-gray-700 text-center">
            <Link to={props.product._id!.toString() as string} className="">
              {props.product.title}
            </Link>
          </h2>
        </div>

        <div className="flex flex-col basis-1/4">
          <p className="text-sm font-medium text-gray-900 ">
            {props.product.price} $
          </p>
          <p className="text-sm font-medium text-gray-900">
            Cantidad: {props.quantity}
          </p>
        </div>

        <div className="basis-1/12">
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={handleRemoveFromCart}
            className="hover:cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}

export default CartProduct;

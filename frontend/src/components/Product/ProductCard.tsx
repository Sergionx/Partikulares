import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IProduct from "../../../../backend/models/interfaces/IProduct";
import useProduct from "../../hooks/useProduct";

interface IPropsProduct {
  product: IProduct;
}

function ProductCard(props: IPropsProduct) {
  const navigate = useNavigate();

  function handleImageClick() {
    navigate(props.product._id!.toString() as string);
  }

  return (
    <>
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={props.product.imageUrl as string}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full 
            hover:cursor-pointer"
          onClick={handleImageClick}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={props.product._id!.toString() as string} className="">
              {props.product.title}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {props.product.price} $
        </p>
      </div>
    </>
  );
}

export default ProductCard;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ICategory from "../../../../backend/models/interfaces/ICategory";
import Category from "../../components/Category/Category";
import axiosClient from "../../config/axiosClient";
import useProduct from "../../hooks/useProduct";

function ProductDetails() {
  const params = useParams();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [precio, setPrecio] = useState(0);

  const { obtenerProducto, product, mostrarAlerta } = useProduct();

  const categorias: ICategory[] = [
    {
      _id: "62758f409f3467f83afc629c",
      title: "Bolsa de vino",
      products: [
        "62786acc531fb4b8f0899c56",
        "627b09a9d43ebb213cda7e29",
        "627b0a4bd43ebb213cda7e33",
      ],
    },
    {
      _id: "627870dc531fb4b8f0899c61",
      title: "Bolsa de hrhrhr",
      products: ["627b09a9d43ebb213cda7e29", "627b0a4bd43ebb213cda7e33"],
    },
  ];
  //TODO- Utilizar una UI mas profesional
  //TODO_ Arreglar bug que no carga bien las categorias, pero si utilizo la lista de arriba si carga bien
  useEffect(() => {
    obtenerProducto(params.id as string);

    if (categories.length < 1) {
      const categorias: ICategory[] = [];
      try {
        product.categories.forEach(async (categoria) => {
          console.log(`Cargo la categoria ${categoria}`);
          const { data } = await axiosClient.get(`categories/${categoria}`);
          categorias.push(data);
        });
        setCategories(categorias);
      } catch (error: any) {
        console.log(error);
        mostrarAlerta({
          msg: "No se pudo obtener la categoria",
          error: true,
        });
      }
    }
  }, []);

  async function handleBuyBtn(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
  }

  return (
    <main className="mx-auto pt-14 px-4 sm:pt-16 sm:pb-32 sm:px-6 lg:max-w-7x1 lg:px-8">
      {/* Product */}
      <div className="lg:grid lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        {/* Product image */}
        <div className="lg:col-span-4">
          <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
            <img
              src={product.imageUrl as string}
              className="object-center object-cover"
            />
          </div>
        </div>

        {/* Product details */}
        <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:col-span-3">
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold tracking-tight Otext-gray-900 sm: text-3x1">
              {product.title}
            </h1>
          </div>
          <p className="text-gray-500 mt-6">{product.description}</p>

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6">
            {categories.map((category) => (
              <div key={category.toString()} className="py-2">
                <Category
                  category={category}
                  onSaveCategory={() => {}}
                  isLink={true}
                />
              </div>
            ))}
          </div>

          <div className="my-5 flex">
            <input
              id="precio"
              type="number"
              className="flex border-2 w-full placeholder-gray-400
        rounded-md"
              placeholder="Precio del Producto"
              value={precio}
              style={{ width: "100px" }}
              onChange={(e) => setPrecio(parseInt(e.target.value))}
            />
            <p className="flex">{product.price} $ </p>
          </div>

          <div className="flex">
            <button
              type="button"
              className="w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center
              justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
              onClick={handleBuyBtn}
            >
              COMPRAR YA
            </button>

            <button
              type="button"
              className="w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center
              justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
              onClick={handleBuyBtn}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;

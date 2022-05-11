import React, { useEffect, useState } from "react";
import axiosClient from "../../config/axiosClient";
import ICategory from "../../../../backend/models/interfaces/ICategory";
import Alert from "../Alert";
import Category from "./Category";

interface ICategoriesSelecter {
  onSaveCategory: (category: ICategory, add: boolean) => void;
}

function CategoriesSelecter(props: ICategoriesSelecter) {
  const [categorias, setCategorias] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [alerta, setAlerta] = useState({ msg: "", error: false });
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getCategorias() {
      const { data } = await axiosClient.get("/categories");
      setCategorias(data);
    }
    if (categorias.length < 1) {
      getCategorias();
    }
    setFilteredCategories(categorias);
  }, [categorias]);

  function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setFilteredCategories(
      categorias.filter((category) => {
        return category.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      })
    );
  }

  async function crearCategoriaHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (!search) {
      setAlerta({
        msg: "El nombre de la categoría es obligatorio",
        error: true,
      });
    }
    try {
      const { data } = await axiosClient.post("/categories", {
        title: search,
      });

      setCategorias([...categorias, data]);
      setSearch("");
      setAlerta({
        msg: "Categoria Creada",
        error: false,
      });
    } catch (error: any) {
      console.log(error);
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  }

  return (
    <>
      <div className="">
        {alerta.msg && <Alert alerta={alerta} />}
        <h1 className="text-center font-bold text-green100">
          Selecciona las categorías que quieras
        </h1>
        <div className="flex flex-wrap justify-center">
          <input
            className="border-2 w-8/12 p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Busca la categoría que quieras"
            value={search}
            onChange={searchHandler}
          />
          <button
            className="border-2 w-3/12 mt-2 placeholder-gray-400 rounded-md"
            onClick={crearCategoriaHandler}
          >
            Crear categoria
          </button>
        </div>

        <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6">
          {filteredCategories.map((category) => (
            <div className="py-2">
              <Category
                key={category._id.toString()}
                category={category}
                onSaveCategory={props.onSaveCategory}
              />
            </div>
          ))}
        </div>
        {filteredCategories.length < 1 && (
            <p className="text-center pb-2 ">
              Si desea crear una categoría nueva con el nombre que busca, solo pulse "Crear Categoría"
            </p>
        )}
      </div>
    </>
  );
}

export default CategoriesSelecter;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import ICategory from "../../../../backend/models/interfaces/ICategory";

interface IPropsCategory {
  category: ICategory;
  onSaveCategory: (category: ICategory, add: boolean) => void;
  isLink: boolean;
}

function Category(props: IPropsCategory) {
  const [selected, setSelected] = useState(false);

  function handleButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (selected) {
      setSelected(false);
      props.onSaveCategory(props.category, false);
    } else {
      setSelected(true);
      props.onSaveCategory(props.category, true);
    }
  }

  //TODO- Hacer que si es link, redireccionar a la tienda filtrado a esa categoria
  return (
    <>
      {props.isLink ? (
        <Link
          to=""
          className={
            "relative overflow-hidden text-center bg-verdePrtk-100 rounded-lg sm:py-2 transition-colors" +
            " hover:bg-verdePrtk-200 hover:text-white"
          }
        >
          {props.category.title}
        </Link>
      ) : (
        <button //TODO- Change width when in a small device
          className={
            "relative w-full overflow-hidden text-center bg-verdePrtk-100 rounded-lg sm:py-2 transition-colors" +
            (selected
              ? " bg-verdePrtk-300 text-white"
              : "hover:cursor-pointer hover:bg-verdePrtk-200 hover:text-white")
          }
          onClick={handleButton}
        >
          {props.category.title}
        </button>
      )}
    </>
  );
}

export default Category;

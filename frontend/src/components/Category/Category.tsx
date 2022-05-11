import React, { useState } from "react";
import ICategory from "../../../../backend/models/interfaces/ICategory";

interface IPropsCategory {
  category: ICategory;
  onSaveCategory: (category: ICategory, add: boolean) => void;
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

  //console.log(props.category);
  return (
    <button //TODO- Change width when in a small device
      className={'relative w-full overflow-hidden text-center bg-verdePrtk-100 rounded-lg sm:py-2 transition-colors' +
      (selected ? ' bg-verdePrtk-300 text-white' : 'hover:cursor-pointer hover:bg-verdePrtk-200 hover:text-white')}
      onClick={handleButton}
    >
      {props.category.title}
    </button>
  );
}

export default Category;

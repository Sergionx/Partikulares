import React, { useState } from "react";
import axiosClient from "../../config/axiosClient";
import ICategory from "../../../../backend/models/interfaces/ICategory";
import Alert from "../Alert";
import CategoriesSelecter from "../Category/CategoriesSelecter";
import useProduct from "../../hooks/useProduct";

function ProductForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [categorias, setCategorias] = useState<ICategory[]>([]);

  const [image, setImage] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const {mostrarAlerta, alerta, submitProduct} = useProduct();

  function handleImageChange(e: any) {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setImage(e.target.value);
  }

  function previewFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  }

  //TODO- Cuando se cree un nuevo procucto hacer que las categorias se deseleccionen
  async function handlePostProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nombre || !descripcion || !precio || !selectedFile || !categorias) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (precio < 0) {
      mostrarAlerta({
        msg: "El precio no puede ser negativo",
        error: true,
      });
      return;
    }

    if (categorias.length < 1) {
      mostrarAlerta({
        msg: "Selecciona al menos una categoría",
        error: true,
      });
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile as any);

      reader.onloadend = async () => {
        //TODO- Considera si ponerlo en ProductProvider
        submitProduct(
          {
            title: nombre,
            description: descripcion,
            image: reader.result,
            price: precio,
            categories: [], //No se va a usar, pero la interfaz me obliga a usarlo
            imageUrl: null,
            _id: null,
          }, categorias);

        setNombre("");
        setDescripcion("");
        setPrecio(0);
        setCategorias([]);
        setImage("");
        setPreviewSource("");
        setSelectedFile(null);
      };
    } catch (error: any) {
      console.log(error);
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }

  function saveCategoryHandler(category: ICategory, add: boolean) {
    //TODO- REVISAR ESTO
    if (add) {
      setCategorias([...categorias, category]);
    } else {
      setCategorias(categorias.filter((c) => c._id !== category._id));
    }
  }

  const { msg } = alerta;
  return (
    <>
      <form
        className="bg-white px-5 md:w-1/2 rounded-lg"
        onSubmit={handlePostProduct}
      >
        {msg && <Alert alerta={alerta} />}
        <div className="mb-5">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nombre"
          >
            Nombre del Producto
          </label>

          <input
            id="nombre"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400
        rounded-md"
            placeholder="Nombre del Producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="descripcion"
          >
            Descripción
          </label>

          <textarea
            id="descripcion"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400
        rounded-md"
            placeholder="Descripción  del Producto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="precio"
          >
            Precio
          </label>

          <input
            id="precio"
            type="number"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400
        rounded-md"
            placeholder="Precio del Producto"
            value={precio}
            style={{ width: "100px" }}
            onChange={(e) => setPrecio(parseInt(e.target.value))}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imagen"
          >
            Imagen
          </label>

          <input
            id="imagen"
            accept="image/*"
            type="file"
            name="productImage"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400
        rounded-md"
            value={image}
            onChange={handleImageChange}
          />
        </div>

        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
        )}
        <CategoriesSelecter onSaveCategory={saveCategoryHandler} />
        <input
          type="submit"
          value="Crear Producto"
          className="bg-green-500 w-full py-3 text-white font-bold uppercase rounded 
          hover:cursos-pointer hover:cursor-pointer hover:bg-green-600 transition-colors mb-5"
        />
      </form>
    </>
  );
}

export default ProductForm;

import express from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  addProductToCategory,
  getProductCategory,
} from "../controllers/categoryController";
const router = express.Router();

router
  .route("/")
  .post(createCategory) //Crea una nueva categoria
  .get(getCategories); //Obtiene todas los categorias
router
  .route("/:id")
  .get(getCategory) //Obtiene una categoria
  .put(updateCategory) //Actualiza una categoria
  .delete(deleteCategory); //Elimina una categoria

router
  .route("/:id/products")
  .get(getProductCategory) // Obtiene todos los productos de una categoria
  .post(addProductToCategory); //Agrega un producto a una categoria
export default router;

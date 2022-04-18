import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import checkAdmin from "../middlewares/checkAdmin";

const router = express.Router();

router
  .route("/")
  .post(checkAdmin, createProduct) //Crea un nuevo producto
  .get(getProducts); //Obtiene todos los productos
router
  .route("/:id")
  .get(getProduct) //Obtiene un producto
  .put(checkAdmin, updateProduct) //Actualiza un producto
  .delete(checkAdmin, deleteProduct); //Elimina un producto

export default router;

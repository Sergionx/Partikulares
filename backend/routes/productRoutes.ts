import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import checkAdmin from "../middlewares/checkAdmin";
import checkAuth from "../middlewares/checkAuth";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, checkAdmin, createProduct) //Crea un nuevo producto
  .get(getProducts); //Obtiene todos los productos
router
  .route("/:id")
  .get(getProduct) //Obtiene un producto
  .put(checkAuth, checkAdmin, updateProduct) //Actualiza un producto
  .delete(checkAuth, checkAdmin, deleteProduct); //Elimina un producto

export default router;

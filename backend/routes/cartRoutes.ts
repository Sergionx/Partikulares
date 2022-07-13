import express from "express";
import {
  createCart,
  getCart,
  addProduct,
  deleteProduct,
  deleteCart,
} from "../controllers/cartController";
import checkAuth from "../middlewares/checkAuth";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, createCart) // Crea un nuevo carrito
  .get(checkAuth, getCart) // Devuelve el carrito del usuario
  .delete(checkAuth, deleteCart); // Elimina el carrito del usuario

router
  .route("/:productId")
  .put(checkAuth, addProduct) // Agrega un producto al carrito
  .delete(checkAuth, deleteProduct); // Elimina un producto del carrito
export default router;

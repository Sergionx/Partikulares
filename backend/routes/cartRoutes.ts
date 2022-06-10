import express from "express";
import {
  createCart,
  getCart,
  addProduct,
  deleteCart,
} from "../controllers/cartController";
import checkAuth from "../middlewares/checkAuth";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, createCart) // Crea un nuevo carrito
  .get(checkAuth, getCart) // Devuelve el carrito del usuario
  .put(checkAuth, addProduct) // Agrega un producto al carrito
  .delete(checkAuth, deleteCart); // Elimina el carrito del usuario


export default router;

import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/orderController";
import checkAuth from "../middlewares/checkAuth";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getOrders) // Devuelve todas las ordenes
  .post(createOrder); // Crea una orden
router
  .route("/:id")
  .get(getOrder) // Devuelve una orden dado el id
  .delete(deleteOrder) // Elimina una orden dado el id
  .put(updateOrder); // Actualiza una orden dado el id

export default router;

import { Request, Response } from "express";
import Order from "../models/Order";

async function createOrder(req: Request, res: Response) {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
    console.log(savedOrder);
  } catch (error) {
    console.log(error);
  }
}

async function getOrders(req: Request, res: Response) {
  const orders = await Order.find();
  res.json(orders);
}

async function getOrder(req: Request, res: Response) {
  const { id } = req.params;

  const order = await Order.findOne({ id });
  if (!order) {
    const error = new Error("No existe un producto con ese id");
    return res.status(404).json({ msg: error.message });
  }

  res.json(order);
  console.log(order);
}

async function deleteOrder(req: Request, res: Response) {
  const { id } = req.params;

  const order = await Order.findOne({ id });
  if (!order) {
    const error = new Error("No existe un producto con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const deletedOrder = await Order.deleteOne(order);
    res.json(deletedOrder);
  } catch (error) {
    console.log(error);
  }
}

async function updateOrder(req: Request, res: Response) {
  const { id } = req.params;

  const order = await Order.findOne({ id });
  if (!order) {
    const error = new Error("No existe un producto con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const updatedOrder = await Order.updateOne(order, req.body);
    res.json(updatedOrder);
  } catch (error) {
    console.log(error);
  }
}

export { createOrder, getOrders, getOrder, deleteOrder, updateOrder };

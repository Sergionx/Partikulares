import { Request, Response } from "express";
import Cart from "../models/Cart";

async function createCart(req: Request, res: Response) {
  const { userId } = req.body;
  const cart = new Cart({ userId });
  await cart.save();
  res.status(201).json(cart);
}

async function getCart(req: Request, res: Response) {
  const { id } = req.params;
  const cart = await Cart.findOne({ id });
  if (!cart) {
    const error = new Error("No existe un producto con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    res.json(cart);
    console.log(cart);
  } catch (error) {
    console.log(cart);
  }
}

async function addProduct(req: Request, res: Response) {
  const { id } = req.params;
  const { productId } = req.body;

  const cart = await Cart.findOne({ id });
  if (!cart) {
    const error = new Error("No existe un producto con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const updatedCart = await Cart.updateOne(
      { id },
      { $push: { products: productId } }
    );
    res.json(updatedCart);
    console.log(updatedCart);
  } catch (error) {
    console.log(error);
  }
}

async function deleteCart(req: Request, res: Response) {
  const { id } = req.params;

  const cart = await Cart.findOne({ id });
  if (!cart) {
    const error = new Error("No existe un producto con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const deletedCart = await Cart.deleteOne(cart);
    res.json(deletedCart);
    console.log(deletedCart);
  } catch (error) {
    console.log(error);
  }
}

export { createCart, getCart, addProduct, deleteCart };

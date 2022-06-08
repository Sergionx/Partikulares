import { Request, Response } from "express";
import Cart from "../models/Cart";
import IProduct from "../models/interfaces/IProduct";

async function createCart(req: Request, res: Response) {
  const existeCart = await Cart.find({ user: req.body.user });
  if (existeCart) {
    const error = new Error("El usuario ya tiene un carrito");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const { userId } = req.body;
    const cart = new Cart({ userId, products: req.body.cartItems });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
  }
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

  const cart = await Cart.findById(id);
  if (!cart) {
    const error = new Error("No existe un carrito con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const product = await cart.products.find(
      (product: IProduct) => product._id!.toString() === productId
    );

    if (product) {
      const updatedCart = await Cart.updateOne(
        { id },
        { $inc: { "products.$.quantity": 1 } }
      );
      res.json(updatedCart);
      console.log(updatedCart);
    } else {
      const updatedCart = await Cart.updateOne(
        { id },
        { $push: { products: { productId, quantity: 1 } } }
      );
      res.json(updatedCart);
      console.log(updatedCart);
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteCart(req: Request, res: Response) {
  const { id } = req.params;

  const cart = await Cart.findById(id);
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

import { Request, Response } from "express";
import Cart from "../models/Cart";

async function createCart(req: Request, res: Response) {
  const existeCart = await Cart.findOne({ user: req.usuario._id });
  if (existeCart) {
    console.log(existeCart);
    const error = new Error("El usuario ya tiene un carrito");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const cart = new Cart({
      user: req.usuario._id,
      products: req.body.products,
    });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
  }
}

async function getCart(req: Request, res: Response) {
  const cart = await Cart.findOne({ user: req.usuario._id });
  if (!cart) {
    const error = new Error(
      "No existe un usuario con ese id que tenga un carrito"
    );
    return res.status(404).json({ msg: error.message, status: 404 });
  }

  try {
    res.json(cart);
    console.log(cart);
  } catch (error) {
    console.log(cart);
  }
}

async function addProduct(req: Request, res: Response) {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.usuario._id });
  if (!cart) {
    const error = new Error(
      "No existe un usuario con ese id que tenga un carrito"
    );
    return res.status(404).json({ msg: error.message });
  }

  try {
    console.log(cart.products);
    const productIndex = cart.products.findIndex(
      (p: any) => p.product == productId
    );

    if (productIndex >= 0) {
      const updatedCart = await Cart.updateOne(
        { user: req.usuario._id },
        { $inc: { "products.$[element].quantity": 1 } },
        {arrayFilters: [{ "element.product": productId }]}
      );

      res.status(201).json(updatedCart);
    } else {
      const updatedCart = await Cart.updateOne(
        { user: req.usuario._id },
        { $push: { products: { product: productId, quantity: 1 } } }
      );
      
      res.status(201).json(updatedCart);
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteCart(req: Request, res: Response) {
  const cart = await Cart.findOne({ user: req.usuario._id });
  if (!cart) {
    const error = new Error(
      "No existe un usuario con ese id que tenga un carrito"
    );
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

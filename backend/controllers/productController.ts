import { Request, Response } from "express";
import Product from "../models/Product";

async function createProduct(req: Request, res: Response) {
  const { title } = req.body;
  const existProduct = await Product.findOne({ title });
  if (existProduct) {
    const error = new Error("Ya existe un producto con ese nombre");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.json(savedProduct);
    console.log(savedProduct);
  } catch (error) {
    console.log(error);
  }
}

async function getProducts(req: Request, res: Response) {
  const { categories } = req.query;

  try {
    if (categories) {
      const products = await Product.find({ categories: { $in: [categories] } });
      res.json(products);
      console.log(products);
    } else {
      const products = await Product.find();
      res.json(products);
      console.log(products);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req: Request, res: Response) {
  const { id } = req.params;
  
  const product = await Product.findById(id);
  if (!product) {
    const error = new Error("No existe un producto con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    res.json(product);
    console.log(product);
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    const error = new Error("No existe un producto con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const updatedProduct = await Product.updateOne(product, req.body);
    res.json(updatedProduct);
    console.log(product);
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    const error = new Error("No existe un producto con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const deletedProduct = await Product.deleteOne(product);
    res.json(deletedProduct);
    console.log(product);
  } catch (error) {
    console.log(error);
  }
}

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };

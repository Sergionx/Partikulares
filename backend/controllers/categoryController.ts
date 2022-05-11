import { Request, Response } from "express";
import Category from "../models/Category";
import Product from "../models/Product";

async function createCategory(req: Request, res: Response) {
  const { title } = req.body;
  const existCategory = await Category.findOne({ title });
  if (existCategory) {
    const error = new Error("Ya existe una categoría con ese nombre");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const category = new Category(req.body);

    const savedCategory = await category.save();
    res.json(savedCategory);
    console.log(savedCategory);
  } catch (error) {
    console.log(error);
  }
}

async function getCategories(req: Request, res: Response) {
  try {
    const categories = await Category.find();
    res.json(categories);
    console.log(categories);
  } catch (error) {
    console.log(error);
  }
}

async function getCategory(req: Request, res: Response) {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    const error = new Error("No existe una categoria con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    res.json(category);
    console.log(category);
  } catch (error) {
    console.log(error);
  }
}

async function updateCategory(req: Request, res: Response) {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    const error = new Error("No existe una categoria con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const updatedCategory = await Category.updateOne(category, req.body);
    res.json(updatedCategory);
    console.log(category);
  } catch (error) {
    console.log(error);
  }
}

async function deleteCategory(req: Request, res: Response) {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    const error = new Error("No existe una categoria con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const deletedCategory = await Category.deleteOne(category);
    res.json(deletedCategory);
    console.log(category);
  } catch (error) {
    console.log(error);
  }
}

async function addProductToCategory(req: Request, res: Response){
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    const error = new Error("No existe una categoria con ese id");
    return res.status(404).json({ msg: error.message });
  }

  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error("No existe un producto con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const updatedCategory = await Category.updateOne(category, { $push: { products: productId } });
    res.json(updatedCategory);
    console.log(category);
  } catch (error) {
    console.log(error);
  }
}

async function getProductCategory(req: Request, res: Response) {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    const error = new Error("No existe una categoria con ese id");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const products = await Product.findOne({ category: id });
    res.json(products);
    console.log(products);
  } catch (error) {
    console.log(error);
  }
}
export {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  addProductToCategory,
  getProductCategory,
};

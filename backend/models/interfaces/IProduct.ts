import ICategory from "./ICategory";
import { Types } from "mongoose";

interface IProduct {
  _id: Types.ObjectId | string;
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
  image: string | ArrayBuffer | null;
  categories: [];
}

export default IProduct;

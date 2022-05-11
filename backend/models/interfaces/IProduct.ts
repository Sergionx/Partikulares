import ICategory from "./ICategory";
import { Types } from "mongoose";

interface IProduct {
  _id: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: ICategory[];
}

export default IProduct;

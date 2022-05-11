import IProduct from "./IProduct";
import { Types } from "mongoose";

interface ICategory {
  _id: Types.ObjectId;
  title: string;
  products: IProduct[];
}

export default ICategory;

import { Types } from "mongoose";

interface ICategory {
  _id: Types.ObjectId | string;
  title: string;
  products: string[];
}

export default ICategory;

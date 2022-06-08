import { Types } from "mongoose";

interface ICart {
  _id: Types.ObjectId | string;
  products: [{ product: Types.ObjectId | string; quantity: number }];
}

export default ICart;

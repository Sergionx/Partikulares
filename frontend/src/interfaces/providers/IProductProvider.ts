import IAuth from "../IAuth";
import IProduct from "../../../../backend/models/interfaces/IProduct";

interface IProductProvider {
  products: IProduct[];
}

export default IProductProvider;
import IAuth from "../IAuth";
import IProduct from "../../../../backend/models/interfaces/IProduct";
import IAlerta from "../IAlert";

interface  IProductProvider {
  products: IProduct[];
}

export default IProductProvider;
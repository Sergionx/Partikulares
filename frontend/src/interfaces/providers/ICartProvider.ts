import IProduct from "../../../../backend/models/interfaces/IProduct";
import IAlerta from "../IAlert";
import IProductCart from "../IProductCart";

interface ICartProvider {
  productsCart: IProductCart[];
  addProduct(product: IProduct, quantity: number): void
  alertaCart: IAlerta
}

export default ICartProvider;
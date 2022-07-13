import IProduct from "../../../../backend/models/interfaces/IProduct";
import IAlerta from "../IAlert";
import IProductCart from "../IProductCart";

interface ICartProvider {
  productsCart: IProductCart[];
  alertaCart: IAlerta
  addProduct(product: string, quantity: number): void
  removeProduct(productId: string): void
  createCart(): void
}

export default ICartProvider;
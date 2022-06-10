import ICart from "../../../../backend/models/interfaces/ICart";
import IProduct from "../../../../backend/models/interfaces/IProduct";


interface ICartProvider {
  setCart: React.Dispatch<React.SetStateAction<ICart>>
  cart: ICart
  addProduct(product: IProduct): void
}

export default ICartProvider;
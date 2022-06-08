import ICart from "../../../../backend/models/interfaces/ICart";


interface ICartProvider {
  setCart: React.Dispatch<React.SetStateAction<ICart>>
  cart: ICart
}

export default ICartProvider;
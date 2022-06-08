import IProduct from "../../../../backend/models/interfaces/IProduct";
import IAlerta from "../IAlert";
import ICategory from "../../../../backend/models/interfaces/ICategory";

interface IProductProvider {
  products: IProduct[];
  product: IProduct;
  mostrarAlerta(alerta: IAlerta): void;
  alerta: IAlerta;
  submitProduct(product: IProduct, categorias: ICategory[]): void;
  obtenerProducto(productId: string): void;
}

export default IProductProvider;

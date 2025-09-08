import { CartProduct } from "./cartProduct";

export interface CartContextType {
  cartProducts: CartProduct[];
  setCartProducts: (products: CartProduct[]) => void;
  addToCart: (product: CartProduct) => void;
  removeCartProduct: (index: number) => void;
  clearCart: () => void;
}

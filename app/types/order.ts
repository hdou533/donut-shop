import { CartProduct } from "./cartProduct";

export interface Order {
  _id?: string;
  userEmail: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  cartProducts: CartProduct[];
  paid: boolean;
  createdAt?: string;
  updatedAt?: string;
}

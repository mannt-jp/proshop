import CartItem, { isCartItem } from "./CartItem";
import User from "./User";

export default interface Cart {
  user?: User;
  cartItems: CartItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export const isCart = (arg: any): arg is Cart => {
  return arg && arg.cartItems && isCartItem(arg.cartItems);
}
import Product, { isProduct } from "./Product";

export default interface CartItem {
  quantity: number;
  product: Product;
}

export const isCartItem = (arg: any): arg is CartItem => {
  return arg && arg.quantity && typeof arg.quantity == "number" && arg.product && isProduct(arg.product);
}
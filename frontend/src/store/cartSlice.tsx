import { createSlice } from "@reduxjs/toolkit";
import CartItem from "../interfaces/CartItem";
import Product from "../interfaces/Product";
import Cart, { isCart } from "../interfaces/Cart";
import addDecimals from "../utils/addDecimals";

let initialState: Cart;

const cachedCart = localStorage.getItem("cart");
const objectCachedCart = cachedCart ? JSON.parse(cachedCart) : null;

if (objectCachedCart != null && isCart(objectCachedCart)) {
  initialState = objectCachedCart;
} else {
  initialState = {
    cartItems: [],
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
  };
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state: typeof initialState,
      action: {
        payload: { product: Product; quantity: number };
        type: string;
      }
    ) => {
      // Adding to cartItems
      const addingItem = action.payload.product;
      const existingCartItemIndex = state.cartItems.findIndex(
        (i: CartItem) => i.product._id === addingItem._id
      );
      if (existingCartItemIndex) {
        const updatingCartItem = state.cartItems[existingCartItemIndex];
        if (updatingCartItem && updatingCartItem.quantity) {
          updatingCartItem.quantity += action.payload.quantity;
        }
      } else {
        state.cartItems = [
          ...state.cartItems,
          { quantity: action.payload.quantity, product: addingItem },
        ];
      }
      // Recalculating prices
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (prev, curr) => prev + curr.quantity * curr.product.price,
          0
        )
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      state.taxPrice = addDecimals(state.itemsPrice * 0.15);
      state.totalPrice = parseInt(
        (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

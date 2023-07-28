import { createSlice } from "@reduxjs/toolkit";
import { CartItemType } from "../types/CartItemType";
import { ProductType } from "../types/ProductType";
import { CartType, isCart } from "../types/CartType";
import recalculatingPrices from "./cartUtils";

let initialState: CartType;

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
    shippingAddress: { address: "", city: "", postalCode: "", country: "" },
    paymentMethod: "PayPal",
  };
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state: CartType,
      action: {
        payload: { product: ProductType; quantity: number };
        type: unknown;
      }
    ) => {
      // Adding to cartItems
      const addingItem = action.payload.product;
      const existingCartItemIndex = state.cartItems.findIndex(
        (i: CartItemType) => i.product._id === addingItem._id
      );
      if (existingCartItemIndex !== -1) {
        const updatingCartItem = state.cartItems[existingCartItemIndex];
        if (updatingCartItem && updatingCartItem.quantity) {
          updatingCartItem.quantity += action.payload.quantity;
        }
      } else {
        state.cartItems.push({
          quantity: action.payload.quantity,
          product: addingItem,
        });
      }
      // Recalculating prices
      recalculatingPrices(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    changeQuantity: (
      state: CartType,
      action: {
        payload: { productId: string; quantity: number };
        type: unknown;
      }
    ) => {
      const existingCartItemIndex = state.cartItems.findIndex(
        (i: CartItemType) => i.product._id === action.payload.productId
      );
      if (existingCartItemIndex !== -1) {
        const updatingCartItem = state.cartItems[existingCartItemIndex];
        if (updatingCartItem && updatingCartItem.quantity) {
          if (action.payload.quantity !== 0)
            updatingCartItem.quantity = action.payload.quantity;
          else state.cartItems.splice(existingCartItemIndex, 1);
        }
      }
      // Recalculating prices
      recalculatingPrices(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveShippingAddress: (
      state: CartType,
      action: {
        payload: {
          address: string;
          city: string;
          postalCode: string;
          country: string;
        };
        type: unknown;
      }
    ) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (
      state: CartType,
      action: {
        payload: string;
        type: unknown;
      }
    ) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state: CartType) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.taxPrice = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;
      state.shippingAddress = {
        address: "",
        city: "",
        postalCode: "",
        country: "",
      };
      state.paymentMethod = "PayPal";
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

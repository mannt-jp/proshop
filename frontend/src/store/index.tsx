import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { authReducer } from "./authSlice";
const store = configureStore({
  reducer: { cart: cartReducer, auth: authReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;

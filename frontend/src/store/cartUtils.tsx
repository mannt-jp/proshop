import { CartType } from "../types/CartType";
import addDecimals from "../utils/addDecimals";

const recalculatingPrices = (state: CartType) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (prev, curr) => prev + curr.quantity * curr.product.price,
      0
    )
  );
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
  state.taxPrice = addDecimals(state.itemsPrice * 0.15);
  state.totalPrice = parseInt(
    (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
  );
};
export default recalculatingPrices;

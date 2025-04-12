import { configureStore } from "@reduxjs/toolkit";
import productreducer from "../features/shoppingcart/productSlice";
import cartreducer from "../features/shoppingcart/cartSlice";
const store=configureStore({
  reducer: {
    products: productreducer,
    cart : cartreducer
  },
});
export default store;
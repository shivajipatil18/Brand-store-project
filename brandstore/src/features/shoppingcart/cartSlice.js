import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  tempItems: [],
  totalPrice: 0,
};

const storedCart = localStorage.getItem("cart");
if (storedCart) {
  initialState.items = JSON.parse(storedCart);
  initialState.tempItems = [...initialState.items];
  initialState.totalPrice = initialState.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.tempItems = [...state.items];
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    updateTempQuantity: (state, action) => {
      const tempItem = state.tempItems.find(
        (item) => item.id === action.payload.id
      );
      if (tempItem) {
        tempItem.quantity = action.payload.quantity;
      }
    },
    applyTempUpdates: (state, action) => {
      const tempItem = state.tempItems.find(
        (item) => item.id === action.payload.id
      );
      const cartItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (tempItem && cartItem) {
        cartItem.quantity = tempItem.quantity;
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.tempItems = [...state.items];
    },
  },
});

export const { addProduct, removeProduct, updateTempQuantity, applyTempUpdates } =
  CartSlice.actions;
export default CartSlice.reducer;

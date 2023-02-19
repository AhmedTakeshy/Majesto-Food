import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.changed = true;
      if (existingItem) {
        state.totalAmount += newItem.price;
        state.totalQuantity++;
        existingItem.quantity++;
      } else {
        state.totalAmount += newItem.price * newItem.quantity;
        state.totalQuantity += newItem.quantity;
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          title: newItem.title,
          quantity: newItem.quantity,
        });
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.changed = true;
      state.totalAmount -= existingItem.price;
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
    reset(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

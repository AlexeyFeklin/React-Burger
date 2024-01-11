import { createSlice } from '@reduxjs/toolkit';
import { isCancel } from 'axios';

export const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem.count) {
        findItem.count--;
        state.totalPrice -= findItem.price; // уменьшаем общую цену на цену одного товара
      } else {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
        state.totalPrice -= findItem.price * findItem.count; // уменьшаем общую цену на цену товара, умноженную на количество
      }
    },
    removeItem(state, action) {
      const itemToRemove = state.items.find((obj) => obj.id === action.payload);
      const itemIndex = state.items.findIndex((obj) => obj.id === action.payload);

      if (itemToRemove) {
        state.items.splice(itemIndex, 1);
        state.totalPrice -= itemToRemove.price * itemToRemove.count;
      }
    },
    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;

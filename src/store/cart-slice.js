import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
          const newItem = action.payload;
          const existingItem = state.items.find((item) => item.id === newItem.id);
    
          if (!existingItem) {
            state.items.push({
              category:newItem.category,
                    title: newItem.title,
                    price:+newItem.price,
                    typeOfProduct:newItem.typeOfProduct,
                    flavor:newItem.flavor,
                    mfgDate:newItem.mfgDate,
                    expDate:newItem.expDate,
                    description:newItem.description,
                    urlId:newItem.urlId,
                    id:newItem.id,
                    url:newItem.url,
                    quantity: 1,
                    maxquantity:newItem.quantity,
                    totalPrice: +newItem.price,
            });
            state.totalQuantity++;
          } else {
            existingItem.totalPrice = existingItem.totalPrice + newItem.price;
          }
        },

    

    removeItemFromCart(state, action) {
      const id = action.payload;

      state.items = state.items.filter((item) => item.id !== id);
      state.totalQuantity--;
    },
    setQuantity(state, action) {
      const { itemId, quantity } = action.payload;

      if (quantity === 0) {
        state.items = state.items.filter((item) => item.id !== itemId);
        state.totalQuantity--;
      }

      state.items = state.items.map((item) => {
        if (item.id === itemId) {
          item.quantity = quantity;
        }

        return item;
      });
    },
  
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
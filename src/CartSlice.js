import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: []
};


const cartSlice = createSlice({
    name: 'for_cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            
            //  console.log("addtocard" , action.payload)
            // state.carts.push(action.payload);
            const obj = { ...action.payload, q: 1 };
            const index = state.carts.findIndex(row => row.id === obj.id);
            if (index === -1) {
                state.carts.push(obj);
            }
            else {
                state.carts[index].q = state.carts[index].q + 1;
            }
        },
        removeFromeCart: (state, action) => {
            state.carts.splice(action.payload, 1)

        },
        increment: (state,action) =>{
            const index = state.carts.find(row => row.id === action.payload.id);
            if(index) index.q +=1
        }
        ,
        decrement: (state,action) =>{
            const index = state.carts.find(row => row.id === action.payload.id);
            if(index && index.q > 1) index.q -=1
        }
        
    }
})

export const { addToCart, removeFromeCart, increment, decrement} = cartSlice.actions

export default cartSlice.reducer
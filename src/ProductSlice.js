import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [], // Changed to lowercase for consistency
    status: 'idle',
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('https://dummyjson.com/products');
        // Combine the two slices into one array
        return [
            ...response.data.products.slice(0, 5), 
            ...response.data.products.slice(15, 18),
            ...response.data.products.slice(21,25),

        ];
    }
);

const productsSlice = createSlice({
    name: 'products', // Updated to reflect the slice's purpose
    initialState,     // Fixed typo
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'; // Use a more descriptive term
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload; // Populate products array
                state.status = 'succeeded';
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'failed'; // Indicate failure
            });
    },
});

export default productsSlice.reducer;

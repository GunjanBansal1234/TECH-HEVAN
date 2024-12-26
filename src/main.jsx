import ReactDOM from 'react-dom/client';
import App from './App';
import productsSlice from './ProductSlice';
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import cartSlice from './CartSlice'
import './index.css'


export const store = configureStore({
    reducer:{      
        pro:productsSlice,
        crt:cartSlice

    }
});
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>);
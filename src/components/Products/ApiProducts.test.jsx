import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ApiProducts from './Products'; // Adjust the import path accordingly
import { fetchProducts } from '../../ProductSlice';  // Adjust the import path accordingly
import { addToCart } from '../../CartSlice';  // Adjust the import path accordingly

// Mock the fetchProducts action
jest.mock('../../ProductSlice', () => ({
  fetchProducts: jest.fn(),
}));

// Mock the Redux store
const mockStore = configureStore({
  reducer: {
    pro: {
      products: [
        { id: 1, title: 'Product 1', price: 100, images: 'image1.jpg' },
        { id: 2, title: 'Product 2', price: 200, images: 'image2.jpg' },
      ],
    },
  },
});

describe('ApiProducts', () => {
  it('renders product list correctly', async () => {
    render(
      <Provider store={mockStore}>
        <ApiProducts />
      </Provider>
    );

    // Check if the products are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Price : 100')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Price : 200')).toBeInTheDocument();
  });

  it('dispatches addToCart action when Add to Cart is clicked', async () => {
    // Mock the dispatch method
    const mockDispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <ApiProducts />
      </Provider>
    );

    // Find the button and click it
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    // Wait for the dispatch to be called
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1));

    // Ensure the action was dispatched with the correct payload
    expect(mockDispatch).toHaveBeenCalledWith(addToCart({ id: 1, title: 'Product 1', price: 100, images: 'image1.jpg' }));
  });

  it('renders the loading spinner when products are not available', async () => {
    // Update the mock store to have an empty product list
    const emptyStore = configureStore({
      reducer: {
        pro: {
          products: [],
        },
      },
    });

    render(
      <Provider store={emptyStore}>
        <ApiProducts />
      </Provider>
    );

    // Check if the loading spinner appears
    expect(screen.getByRole('status')).toBeInTheDocument(); // ClipLoader shows a status role
  });
});

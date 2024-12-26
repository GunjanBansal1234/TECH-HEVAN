import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createStore } from 'redux';
import { addToCart } from '../CartSlice';  // Ensure correct import
import ProductDetails from './ProductDetails';

// Mock store for Redux
const mockStore = (state) => createStore((state) => state, state);

const product = {
  id: 1,
  title: 'Test Product',
  price: '99.99',
  description: 'A detailed description of the product.',
  images: 'https://via.placeholder.com/150',
  reviews: [
    {
      rating: 4,
      comment: 'Great product!',
      date: '2024-12-25',
      reviewerName: 'John Doe',
      reviewerEmail: 'john.doe@example.com',
    },
  ],
};

describe('ProductDetails', () => {
  it('renders product details correctly', async () => {
    // Setup mock store
    const store = mockStore({
      pro: { products: [product] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Check if product details are rendered
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(`Price : ${product.price}`)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${product.reviews[0].rating}`)).toBeInTheDocument();
    expect(screen.getByText(`Comment: ${product.reviews[0].comment}`)).toBeInTheDocument();
    expect(screen.getByText(`Date: ${product.reviews[0].date}`)).toBeInTheDocument();
    expect(screen.getByText(`Name : ${product.reviews[0].reviewerName}`)).toBeInTheDocument();
    expect(screen.getByText(`Email : ${product.reviews[0].reviewerEmail}`)).toBeInTheDocument();
  });

  it('dispatches addToCart action when Add to Cart button is clicked', async () => {
    const store = mockStore({
      pro: { products: [product] },
    });

    // Mock dispatch function using the store's dispatch
    const dispatch = jest.fn();
    store.dispatch = dispatch;

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Trigger click event on "Add to Cart" button
    fireEvent.click(screen.getByText('Add to Cart'));

    // Check if the dispatch was called with correct arguments
    expect(dispatch).toHaveBeenCalledWith(addToCart(product));
  });

  it('shows "Product not found!" if product does not exist', async () => {
    const store = mockStore({
      pro: { products: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/999']}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Product not found!')).toBeInTheDocument();
  });
});

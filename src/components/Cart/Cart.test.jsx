import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CartDetails from './CartDetails';
import reducer from '../../CartSlice'; // Import your cart slice reducer
import '@testing-library/jest-dom/extend-expect';

// Create a test store with initial state
const store = createStore(reducer, {
  crt: {
    carts: [
      { id: 1, title: 'Product 1', price: 100, q: 1, images: 'image1.jpg' },
      { id: 2, title: 'Product 2', price: 200, q: 2, images: 'image2.jpg' },
    ],
  },
});

const renderWithState = (state) => {
  const customStore = createStore(reducer, { crt: { carts: state } });
  return render(
    <Provider store={customStore}>
      <CartDetails />
    </Provider>
  );
};

describe('CartDetails Component', () => {
  it('renders cart items when cart is not empty', () => {
    renderWithState([
      { id: 1, title: 'Product 1', price: 100, q: 1, images: 'image1.jpg' },
      { id: 2, title: 'Product 2', price: 200, q: 2, images: 'image2.jpg' },
    ]);

    expect(screen.getByText('SHOPPING CART')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Rs 100')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Rs 200')).toBeInTheDocument();
  });

  it('displays empty cart message when cart is empty', () => {
    renderWithState([]);
    expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument();
    expect(screen.getByText('continue shopping')).toBeInTheDocument();
  });

  it('increments quantity when + button is clicked', () => {
    renderWithState([
      { id: 1, title: 'Product 1', price: 100, q: 1, images: 'image1.jpg' },
    ]);

    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);

    expect(screen.getByText('2')).toBeInTheDocument(); // Quantity should increment to 2
  });

  it('decrements quantity when - button is clicked', () => {
    renderWithState([
      { id: 1, title: 'Product 1', price: 100, q: 2, images: 'image1.jpg' },
    ]);

    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);

    expect(screen.getByText('1')).toBeInTheDocument(); // Quantity should decrement to 1
  });

  it('removes item from the cart when remove button is clicked', () => {
    renderWithState([
      { id: 1, title: 'Product 1', price: 100, q: 1, images: 'image1.jpg' },
    ]);

    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    expect(screen.queryByText('Product 1')).not.toBeInTheDocument(); // Product should be removed
  });

  it('calculates total price correctly', () => {
    renderWithState([
      { id: 1, title: 'Product 1', price: 100, q: 1, images: 'image1.jpg' },
      { id: 2, title: 'Product 2', price: 200, q: 2, images: 'image2.jpg' },
    ]);

    expect(screen.getByText('Cart Amount : 500')).toBeInTheDocument(); // Total should be 100 + 200*2 = 500
  });
});

// productsSlice.test.js
import { fetchProducts } from './ProductSlice';
import reducer from './ProductSlice';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockStore = configureMockStore([thunk]);
const mockAxios = new MockAdapter(axios);

describe('productsSlice', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  const initialState = {
    products: [],
    status: 'idle',
  };

  it('should return the initial state when passed an empty action', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle fetchProducts.pending action', () => {
    const action = { type: fetchProducts.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle fetchProducts.fulfilled action', () => {
    const mockProducts = [{ id: 1, title: 'Product 1' }];
    const action = { type: fetchProducts.fulfilled.type, payload: mockProducts };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      products: mockProducts,
      status: 'succeeded',
    });
  });

  it('should handle fetchProducts.rejected action', () => {
    const action = { type: fetchProducts.rejected.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: 'failed',
    });
  });

  it('should fetch products successfully', async () => {
    const store = mockStore(initialState);
    const mockProducts = { products: [{ id: 1, title: 'Product 1' }] };

    mockAxios.onGet('https://dummyjson.com/products').reply(200, mockProducts);

    await store.dispatch(fetchProducts());

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchProducts.pending.type);
    expect(actions[1].type).toBe(fetchProducts.fulfilled.type);
    expect(actions[1].payload).toEqual([
      ...mockProducts.products.slice(0, 5),
      ...mockProducts.products.slice(15, 18),
      ...mockProducts.products.slice(21, 25),
    ]);
  });

  it('should handle fetch failure', async () => {
    const store = mockStore(initialState);

    mockAxios.onGet('https://dummyjson.com/products').reply(500);

    await store.dispatch(fetchProducts());

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchProducts.pending.type);
    expect(actions[1].type).toBe(fetchProducts.rejected.type);
  });
});

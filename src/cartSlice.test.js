import cartReducer, {
    addToCart,
    removeFromeCart,
    increment,
    decrement
} from './CartSlice';

const initialState = {
    carts: [],
};

describe('cartSlice', () => {
    it('should handle initial state', () => {
        expect(cartReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
    });

    it('should add a new item to the cart', () => {
        const newItem = { id: 1, name: 'Item 1' };
        const state = cartReducer(initialState, addToCart(newItem));
        expect(state.carts).toHaveLength(1);
        expect(state.carts[0]).toEqual({ ...newItem, q: 1 });
    });

    it('should increment quantity if item already exists', () => {
        const existingState = {
            carts: [{ id: 1, name: 'Item 1', q: 1 }],
        };
        const state = cartReducer(existingState, addToCart({ id: 1, name: 'Item 1' }));
        expect(state.carts[0].q).toBe(2);
    });

    it('should decrement quantity if greater than 1', () => {
        const existingState = {
            carts: [{ id: 1, name: 'Item 1', q: 2 }],
        };
        const state = cartReducer(existingState, decrement({ id: 1 }));
        expect(state.carts[0].q).toBe(1);
    });

    it('should not decrement quantity if it is 1', () => {
        const existingState = {
            carts: [{ id: 1, name: 'Item 1', q: 1 }],
        };
        const state = cartReducer(existingState, decrement({ id: 1 }));
        expect(state.carts[0].q).toBe(1);
    });

    it('should remove an item from the cart by index', () => {
        const existingState = {
            carts: [{ id: 1, name: 'Item 1', q: 1 }],
        };
        const state = cartReducer(existingState, removeFromeCart(0));
        expect(state.carts).toHaveLength(0);
    });
});

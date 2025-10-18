const { calculateDiscount, filterProducts, sortInventory } = require('../script');

describe('calculateDiscount', () => {
    test('applies a valid discount rate', () => {
        expect(calculateDiscount(100, 0.1)).toBe(90);
        expect(calculateDiscount(50, 0.2)).toBe(40);
    });

    test('handles an invalid discount rate gracefully', () => {
        expect(calculateDiscount(100, -0.1)).toBe(null);
        expect(calculateDiscount(100, 1.5)).toBe(null);
    });

    test('handles an invalid price type', () => {
        expect(calculateDiscount('100', 0.1)).toBe(null);
        expect(calculateDiscount(null, 0.1)).toBe(null);
    });

    test('handles negative price', () => {
        expect(calculateDiscount(-100, 0.1)).toBe(null);
    });

    test('handles edge case with a price of 0', () => {
        expect(calculateDiscount(0, 0.2)).toBe(0);
    });

    test('handles edge case with a discount rate of 0', () => {
        expect(calculateDiscount(100, 0)).toBe(100);
    });

    test('handles edge case with a discount rate of 1', () => {
        expect(calculateDiscount(100, 1)).toBe(0);
    });
});

describe('filterProducts', () => {
    const products = [
        { id: 1, price: 50 },
        { id: 2, price: 150 },
        { id: 3, price: 100 }
    ];

    test('filters products with valid callback', () => {
        const result = filterProducts(products, product => product.price > 50);
        expect(result).toEqual([{ id: 2, price: 150 }, { id: 3, price: 100 }]);
    });

    test('returns empty array for empty products array', () => {
        expect(filterProducts([], product => product.price > 50)).toEqual([]);
    });

    test('handles invalid products input', () => {
        expect(filterProducts('not an array', product => product.price > 50)).toEqual([]);
        expect(filterProducts(null, product => product.price > 50)).toEqual([]);
    });

    test('handles invalid callback', () => {
        expect(filterProducts(products, 'not a function')).toEqual([]);
        expect(filterProducts(products, null)).toEqual([]);
    });

    test('returns empty array when no products match callback', () => {
        expect(filterProducts(products, product => product.price > 200)).toEqual([]);
    });
});

describe('sortInventory', () => {
    const inventory = [
        { id: 1, name: 'Pear', price: 200 },
        { id: 2, name: 'Apple', price: 50 },
        { id: 3, name: 'Banana', price: 100 }
    ];

    test('sorts inventory by name in ascending order', () => {
        const result = sortInventory(inventory, 'name');
        expect(result).toEqual([
            { id: 2, name: 'Apple', price: 50 },
            { id: 3, name: 'Banana', price: 100 },
            { id: 1, name: 'Pear', price: 200 }
        ]);
    });

    test('sorts inventory by price in ascending order', () => {
        const result = sortInventory(inventory, 'price');
        expect(result).toEqual([
            { id: 2, name: 'Apple', price: 50 },
            { id: 3, name: 'Banana', price: 100 },
            { id: 1, name: 'Pear', price: 200 }
        ]);
    });

    test('handles empty inventory array', () => {
        expect(sortInventory([], 'price')).toEqual([]);
    });

    test('handles invalid inventory input', () => {
        expect(sortInventory('not an array', 'price')).toEqual([]);
        expect(sortInventory(null, 'price')).toEqual([]);
    });

    test('handles invalid key input', () => {
        expect(sortInventory(inventory, 123)).toEqual([]);
        expect(sortInventory(inventory, null)).toEqual([]);
    });

    test('preserves original inventory (does not mutate)', () => {
        const original = [...inventory];
        sortInventory(inventory, 'price');
        expect(inventory).toEqual(original);
    });
});
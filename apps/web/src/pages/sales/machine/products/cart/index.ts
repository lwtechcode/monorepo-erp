import { assign, createMachine } from 'xstate';
import { StateProducts } from '../../../types';

const initialProductsState = {
  products: [] as StateProducts,
};

// Criação da máquina de estado
export const productMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7CBXAxgFwFkBDHACwEsA7MAOnIgBswBiAQQBF2B9ABQCUA8uwCqAYQAqAbQAMAXUQp0scnnLpKCkAA9EAWgAsADn00AnPoCsAZgBMAdmkBGGwDZHVuwBoQAT0QvDGn19G0djaXtTCwtpfQBfOO80TFxCEgpqOkYWYR52VnEAUV5BEQkZeSQQZCUVNQ0qnQQwwJdraVMXOxtTaQcLbz8EEMCbJzbgu0MAnoSkjGx8YjIqWnomZj5CggEANWL+ITEpOU0a5VV1TSawlxo2l1C7MKtHOysPQf9A4NDwyOiTjm1QWqWWGTW2U2hQAyoVxCUjhIYRUzrVLg1QE0DI5HDQetYovYLPorJ0XF8EFZDIFpI8YnZ9O5Yi5TAlEiBKJg4GdQUt0qs0Rd6tc9NYbGZLLYHM43J9fHowvcLI4LKzHC4rNYVdNgclFmkVpl1mAhXUro09J18RYpo4mW97dN9JTXNIaNTgrbSb0rPF2UA */
  id: 'productMachine',
  initial: 'idle',
  context: initialProductsState,
  states: {
    idle: {
      on: {
        ADD_PRODUCT: {
          actions: assign({
            products: ({ context, event }) => {
              if (event.type === 'ADD_PRODUCT') {
                return [...context.products, event.product];
              }
              return context.products;
            },
          }),
        },

        UPDATE_PRODUCT: {
          actions: assign({
            products: ({ context, event }) => {
              if (event.type === 'UPDATE_PRODUCT') {
                if (event.index < 0 || event.index >= context.products.length) {
                  return context.products;
                }

                return context.products.map((product, index) =>
                  index === event.index
                    ? { ...product, ...event.newProduct }
                    : product,
                );
              }
              return context.products;
            },
          }),
        },

        REMOVE_PRODUCT: {
          actions: assign({
            products: ({ context, event }) => {
              if (event.type === 'REMOVE_PRODUCT') {
                const updatedProducts = context.products.filter(
                  (_, i) => i !== event.index,
                );
                return updatedProducts;
              }
              return context.products;
            },
          }),
        },

        RESET_CART_PRODUCTS: {
          actions: assign({
            products: () => [],
          }),
        },
      },
    },
  },
});

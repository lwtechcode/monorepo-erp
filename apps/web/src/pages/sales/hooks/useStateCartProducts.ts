import { useMachine } from '@xstate/react';
import { productMachine } from '../machine/products/cart';
import { ProductState } from '../types';

export type UpdateProductType = Pick<
  ProductState,
  'quantity' | 'total_value' | 'discount_amount' | 'value_unit'
>;

export function useStateCartProducts() {
  const [stateCart, send] = useMachine(productMachine);

  function handleAddNewProduct(product: ProductState) {
    send({ type: 'ADD_PRODUCT', product });
  }

  function handleUpdateProduct(newProduct: UpdateProductType, index: number) {
    send({ type: 'UPDATE_PRODUCT', newProduct, index });
  }

  function handleRemoveProduct(index: number) {
    send({ type: 'REMOVE_PRODUCT', index });
  }

  function handleResetCartProduct() {
    send({ type: 'RESET_CART_PRODUCTS' });
  }

  return {
    stateCart,
    handleAddNewProduct,
    handleUpdateProduct,
    handleRemoveProduct,
    handleResetCartProduct,
  };
}

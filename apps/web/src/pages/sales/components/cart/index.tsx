import { Button, Flex, Icon, Input, Table } from '@ant-ui/react';

import { formatMoney } from '../../../../utils/formatters';
import { calcTotalValue } from '../../../../utils/functions';
import { ProductState } from '../../types';
import { CartProps } from './types';

import { columns } from './constants';

export function Cart({
  stateCart,
  isLoading,
  handleRemoveProduct,
  handleUpdateProduct,
}: CartProps) {
  function handleChangeInput(
    quantity: string,
    valueUnit: string,
    index: number,
  ) {
    const quantityUpdated = Number(quantity).toString();

    const totalValueUpdated = calcTotalValue(
      valueUnit,
      Number(quantity),
    ).toString();

    handleUpdateProduct(
      {
        quantity: quantityUpdated,
        total_value: totalValueUpdated,
        value_unit: valueUnit,
      },
      index,
    );
  }

  function handleChangeQuantityAdd(
    quantity: string,
    valueUnit: string,
    index: number,
  ) {
    const quantityUpdated = (Number(quantity) + 1).toString();

    const totalValueUpdated = calcTotalValue(
      valueUnit,
      Number(quantity) + 1,
    ).toString();

    handleUpdateProduct(
      {
        quantity: quantityUpdated,
        total_value: totalValueUpdated,
        value_unit: valueUnit,
      },
      index,
    );
  }

  function handleChangeQuantitySub(
    quantity: string,
    valueUnit: string,
    index: number,
  ) {
    if (quantity === '1') {
      return handleRemoveProduct(index);
    }

    const quantityUpdated = (Number(quantity) - 1).toString();
    const totalValueUpdated = calcTotalValue(
      valueUnit,
      Number(quantity) - 1,
    ).toString();

    handleUpdateProduct(
      {
        quantity: quantityUpdated,
        total_value: totalValueUpdated,
        value_unit: valueUnit,
      },
      index,
    );
  }

  const data = stateCart?.context?.products.length
    ? stateCart?.context?.products?.map(
        ({ ...rest }: ProductState, index: number) => {
          const isDiscountProduct = rest.discount_tax !== '0';

          const calcTaxDiscount =
            Number(rest.value_unit) * Number(rest.discount_tax) +
            Number(rest.value_unit);

          const subtotalProduct = calcTaxDiscount * Number(rest.quantity);

          const applyedDiscountValue = isDiscountProduct
            ? calcTaxDiscount
            : rest.value_unit;

          return {
            key: index,
            id: rest.id,
            name: rest.product,
            ord: index + 1,
            value: (
              <Input
                prefix="R$"
                defaultValue={applyedDiscountValue as string}
                onChange={({ target }) => {
                  handleChangeInput(
                    rest.quantity as string,
                    String(target.value),
                    index,
                  );
                }}
                size="small"
              />
            ),
            subtotal: formatMoney(subtotalProduct),
            bar_code: rest.bar_code,
            quantity: (
              <Flex gap={12} className="place-content-center">
                <Button
                  type="primary"
                  size="small"
                  shape="circle"
                  onClick={() => {
                    handleChangeQuantitySub(
                      rest.quantity as string,
                      String(applyedDiscountValue),
                      index,
                    );
                  }}
                >
                  <Icon component="LineOutlined" />
                </Button>

                <Input
                  className="text-center w-[80px]"
                  value={rest.quantity as string}
                  size="small"
                  type="number"
                  onChange={({ target }) => {
                    handleChangeInput(
                      target.value,
                      String(applyedDiscountValue),
                      index,
                    );
                  }}
                />

                <Button
                  type="primary"
                  size="small"
                  shape="circle"
                  onClick={() => {
                    handleChangeQuantityAdd(
                      rest.quantity as string,
                      String(applyedDiscountValue),
                      index,
                    );
                  }}
                >
                  <Icon component="PlusOutlined" />
                </Button>
              </Flex>
            ),
          };
        },
      )
    : null;

  return (
    <div className="flex-1 overflow-auto">
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{ pageSize: 20 }}
        bordered
      />
    </div>
  );
}

import { Checkbox, Flex, Grid, Modal, Typography } from '@ant-ui/react';
import { formatMoney } from '../../../../utils/formatters';
import { ModalViewProductProps } from './types';

export function ModalViewProduct({
  onClose,
  productSelected,
  isVisibleModalViewProduct,
}: ModalViewProductProps) {
  function handleClose() {
    return onClose();
  }

  return (
    <Modal
      open={isVisibleModalViewProduct}
      onCancel={handleClose}
      footer={null}
    >
      <Grid.Row gutter={[12, 12]}>
        <Grid.Col span={24}>
          <Flex vertical>
            <Typography.Text>Nome</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected?.name ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Código de barra</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected.bar_code ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>SKU</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected.sku ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Preço de custo</Typography.Text>
            <Typography.Text type="secondary">
              {formatMoney(productSelected.cost_price as string) ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Preço de venda</Typography.Text>
            <Typography.Text type="secondary">
              {formatMoney(productSelected.sale_price as string) ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Taxa de desconto</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected.discount_tax ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Estoque</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected.stock ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Fabricante</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected.manufacturer ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Modelo</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected.model ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Origem</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected.product_origin ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Categoria</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected.productCategory?.name ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Fornecedor</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected.supplier?.name ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Descrição</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected.description ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Observação</Typography.Text>
            <Typography.Text type="secondary">
              {productSelected.observation ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={24}>
          <Checkbox
            checked={productSelected.active as boolean}
            indeterminate={!productSelected.active}
            disabled
          >
            {!productSelected.active ? 'Produto Inativo' : 'Produto Ativo'}
          </Checkbox>
        </Grid.Col>
      </Grid.Row>
    </Modal>
  );
}

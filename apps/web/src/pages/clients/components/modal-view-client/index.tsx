import { Checkbox, Flex, Grid, Modal, Typography } from '@ant-ui/react';
import {
  formatAddress,
  formatCEP,
  formatCPF,
  formatDate,
  formatPhone,
  formatRG,
} from '../../../../utils/formatters';
import { renderGender, renderGenderType } from '../../../../utils/functions';
import { ModalViewClientProps } from './types';

export function ModalViewClient({
  onClose,
  clientSelected,
  isVisibleModalViewClient,
}: ModalViewClientProps) {
  function handleClose() {
    return onClose();
  }

  return (
    <Modal open={isVisibleModalViewClient} onCancel={handleClose} footer={null}>
      <Grid.Row gutter={[12, 12]}>
        <Grid.Col span={24}>
          <Flex vertical>
            <Typography.Text>Nome</Typography.Text>
            <Typography.Text type="secondary">
              {clientSelected?.name ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>CPF</Typography.Text>
            <Typography.Text type="secondary">
              {formatCPF(clientSelected?.cpf as string) ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>RG</Typography.Text>
            <Typography.Text type="secondary">
              {formatRG(clientSelected?.rg as string) ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Data de nascimento</Typography.Text>
            <Typography.Text type="secondary">
              {formatDate(clientSelected?.birthDate as string) ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Gênero</Typography.Text>
            <Typography.Text type="secondary">
              {renderGender(clientSelected?.gender as renderGenderType) ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Telefone</Typography.Text>
            <Typography.Text type="secondary">
              {formatPhone(clientSelected?.phone as string) ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>E-mail</Typography.Text>
            <Typography.Text type="secondary">
              {clientSelected?.email ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>CEP</Typography.Text>
            <Typography.Text type="secondary">
              {formatCEP(clientSelected?.cep as string) ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Endereço</Typography.Text>
            <Typography.Text type="secondary">
              {formatAddress(clientSelected as any) ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical>
            <Typography.Text>Observação</Typography.Text>
            <Typography.Text type="secondary">
              {clientSelected.observation ?? '-'}
            </Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={24}>
          <Checkbox
            checked={clientSelected.active as boolean}
            indeterminate={!clientSelected.active}
            disabled
          >
            {!clientSelected.active ? 'Cliente Inativo' : 'Cliente Ativo'}
          </Checkbox>
        </Grid.Col>
      </Grid.Row>
    </Modal>
  );
}

import { Typography } from '@ant-ui/react';
import { StatusEnum } from '../../enums';

const objetctMapStatus = {
  [StatusEnum.ATRASADA]: (
    <Typography.Text className="text-red-700">Em Atraso</Typography.Text>
  ),
  [StatusEnum.PAGA]: (
    <Typography.Text className="text-green-500">Paga</Typography.Text>
  ),
  [StatusEnum.PAGA_COM_ATRASO]: (
    <Typography.Text className="text-orange-500">
      Paga com Atraso
    </Typography.Text>
  ),
  [StatusEnum.EM_DIA]: (
    <Typography.Text className="text-blue-500">Em dia</Typography.Text>
  ),
  [StatusEnum.RECEBIDA]: (
    <Typography.Text className="text-blue-500">Recebida</Typography.Text>
  ),
  [StatusEnum.RECEBIDA_COM_ATRASO]: (
    <Typography.Text className="text-orange-500">
      Recebida com atraso
    </Typography.Text>
  ),
};

export function renderStatus(status: StatusEnum) {
  return objetctMapStatus[status];
}

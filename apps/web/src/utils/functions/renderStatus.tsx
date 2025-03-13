import { Typography } from '@ant-ui/react';
import { StatusEnum } from '../../enums';

const objetctMapStatus = {
  [StatusEnum.ATRASADA]: (
    <Typography.Text className="text-red-700 font-bold">
      Em Atraso
    </Typography.Text>
  ),
  [StatusEnum.PAGA]: (
    <Typography.Text className="text-green-500 font-bold">Paga</Typography.Text>
  ),
  [StatusEnum.PAGA_COM_ATRASO]: (
    <Typography.Text className="text-orange-500 font-bold">
      Paga com Atraso
    </Typography.Text>
  ),
  [StatusEnum.EM_DIA]: (
    <Typography.Text className="text-blue-500 font-bold">
      Em dia
    </Typography.Text>
  ),
  [StatusEnum.RECEBIDA]: (
    <Typography.Text className="text-blue-500 font-bold">
      Recebida
    </Typography.Text>
  ),
  [StatusEnum.RECEBIDA_COM_ATRASO]: (
    <Typography.Text className="text-orange-500 font-bold">
      Recebida com atraso
    </Typography.Text>
  ),
};

export function renderStatus(status: StatusEnum) {
  return objetctMapStatus[status];
}

export enum paymentStatusEnum {
  EM_DIA = 1,
  ATRASADA = 2,
  PAGA = 3,
  PAGA_COM_ATRASO = 4,
  RECEBIDA = 5,
  RECEBIDA_COM_ATRASO = 6,
}

export function getFormattedPaymentStatus(status: paymentStatusEnum) {
  const statusMap: Record<paymentStatusEnum, string> = {
    [paymentStatusEnum.EM_DIA]: "Em dia",
    [paymentStatusEnum.ATRASADA]: "Em atraso",
    [paymentStatusEnum.PAGA]: "Paga",
    [paymentStatusEnum.PAGA_COM_ATRASO]: "Paga com atraso",
    [paymentStatusEnum.RECEBIDA]: "Recebida",
    [paymentStatusEnum.RECEBIDA_COM_ATRASO]: "Recebida com atraso",
  };

  return statusMap[status] || "-";
}

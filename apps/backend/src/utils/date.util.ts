import { add, format, sub } from 'date-fns';

type TimeUnit =
  | 'years'
  | 'months'
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds';

// interface DateComparisonResult {
//   isPaymentDateAfterDueDate: boolean;
//   isDueDateBeforeCurrentDate: boolean;
// }

export function incrementDate(
  date: Date,
  amount: number,
  unit: TimeUnit,
): Date | null {
  return add(date, { [unit]: amount });
}

export function decrementDate(
  date: Date,
  amount: number,
  unit: TimeUnit,
): Date | null {
  return sub(date, { [unit]: amount });
}

export function getAtualDate() {
  const currentDate = new Date();

  return new Date(format(currentDate, 'yyyy-MM-dd'));
}

export function getAtualDateWithHours() {
  const dataAtual = new Date();

  const dia = dataAtual.getDate().toString().padStart(2, '0');
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
  const ano = dataAtual.getFullYear();

  const horas = dataAtual.getHours().toString().padStart(2, '0');
  const minutos = dataAtual.getMinutes().toString().padStart(2, '0');

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

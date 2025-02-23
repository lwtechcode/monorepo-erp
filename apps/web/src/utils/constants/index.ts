import { StatusEnum } from '../../enums';

export const MESSAGE_REQUIRED = 'Campo obrigatório';

export const MESSAGE_LENGHT_MIN_LETTER = (number: number) =>
  `Insira no mínimo ${number} letras`;

export const MESSAGE_LENGHT_MAX_LETTER = (number: number) =>
  `Insira no máximo ${number} letras`;

export const STATUS_PAYMENT = [
  {
    label: 'Todas',
    key: '',
  },
  {
    label: 'Pendentes',
    key: StatusEnum.EM_DIA,
  },
  {
    label: 'Atrasada',
    key: StatusEnum.ATRASADA,
  },
  {
    label: 'Paga',
    key: StatusEnum.PAGA,
  },
  {
    label: 'Pagas com atraso',
    key: StatusEnum.PAGA_COM_ATRASO,
  },
];

export const INSTALLMENTS_OPTIONS = [
  {
    label: 'Selecione',
    value: 0,
  },
  {
    label: 'Parcelado em 1x',
    value: 1,
  },
  {
    label: 'Parcelado em 2x',
    value: 2,
  },
  {
    label: 'Parcelado em 3x',
    value: 3,
  },
  {
    label: 'Parcelado em 4x',
    value: 4,
  },
  {
    label: 'Parcelado em 5x',
    value: 5,
  },
  {
    label: 'Parcelado em 6x',
    value: 6,
  },
  {
    label: 'Parcelado em 7x',
    value: 7,
  },
  {
    label: 'Parcelado em 8x',
    value: 8,
  },
  {
    label: 'Parcelado em 9x',
    value: 9,
  },
  {
    label: 'Parcelado em 10x',
    value: 10,
  },
  {
    label: 'Parcelado em 11x',
    value: 11,
  },
  {
    label: 'Parcelado em 12x',
    value: 12,
  },
];

export const STATES = [
  { label: 'Acre', value: 'AC' },
  { label: 'Alagoas', value: 'AL' },
  { label: 'Amapá', value: 'AP' },
  { label: 'Amazonas', value: 'AM' },
  { label: 'Bahia', value: 'BA' },
  { label: 'Ceará', value: 'CE' },
  { label: 'Distrito Federal', value: 'DF' },
  { label: 'Espírito Santo', value: 'ES' },
  { label: 'Goiás', value: 'GO' },
  { label: 'Maranhão', value: 'MA' },
  { label: 'Mato Grosso', value: 'MT' },
  { label: 'Mato Grosso do Sul', value: 'MS' },
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'Pará', value: 'PA' },
  { label: 'Paraíba', value: 'PB' },
  { label: 'Paraná', value: 'PR' },
  { label: 'Pernambuco', value: 'PE' },
  { label: 'Piauí', value: 'PI' },
  { label: 'Rio de Janeiro', value: 'RJ' },
  { label: 'Rio Grande do Norte', value: 'RN' },
  { label: 'Rio Grande do Sul', value: 'RS' },
  { label: 'Rondônia', value: 'RO' },
  { label: 'Roraima', value: 'RR' },
  { label: 'Santa Catarina', value: 'SC' },
  { label: 'São Paulo', value: 'SP' },
  { label: 'Sergipe', value: 'SE' },
  { label: 'Tocantins', value: 'TO' },
];

export const STATUS_CLIENT = [
  { label: 'Todos', key: '' },
  { label: 'Ativo', key: 'ativo' },
  { label: 'Inativo', key: 'inativo' },
];

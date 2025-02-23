import { RequestVerbEnum } from '../../../../../enums';
import { Nullable } from '../../../../../utils/types';

export type ModalAddUnitOfMeasurementProps = {
  isVisibleModalAddUnitOfMeasurement: boolean;
  onClose: () => void;
  isFetchingAddUnitOfMeasurement: boolean;
  isFetchingUpdateUnitOfMeasurement: boolean;
  handleAddUnitOfMeasurement: (client: FormUnitOfMeasurement) => void;
  handleUpdateUnitOfMeasurement: (
    client: FormUnitOfMeasurement & { id: string },
  ) => void;
  form: FormUnitOfMeasurement;
  type: RequestVerbEnum;
};

export type FormUnitOfMeasurement = Partial<
  Nullable<{
    name: string;
    abbreviation: string;
    active?: boolean;
    id?: string;
  }>
>;

export type StateType = {
  form: FormUnitOfMeasurement;
  type: RequestVerbEnum;
};

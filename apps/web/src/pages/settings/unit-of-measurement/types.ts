export type UnitOfMeasurementResponse = {
  unitsMeasurements: UnitOfMeasurement[];
  totalPages: number;
  totalCount: number;
};

export type UnitOfMeasurement = {
  id: string;
  name: string;
  abbreviation: string;
  active: boolean;
};

export type FilterUnitOfMeasurement = {
  name?: string;
  status?: string;
  ordered?: string;
};

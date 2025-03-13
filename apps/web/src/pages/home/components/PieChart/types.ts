import { PieSeriesType, PieValueType } from '@mui/x-charts';
import { MakeOptional } from '@mui/x-charts/internals';

export type PieChartTypes = {
  data: {
    series: MakeOptional<
      PieSeriesType<MakeOptional<PieValueType, 'id'>>,
      'type'
    >[];
  };
  titleChart?: string;
  loading?: boolean;
};

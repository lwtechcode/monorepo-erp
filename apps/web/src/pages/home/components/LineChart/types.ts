import {
  AxisConfig,
  ChartsXAxisProps,
  ChartsYAxisProps,
  LineSeriesType,
} from '@mui/x-charts';
import { AxisScaleConfig, MakeOptional } from '@mui/x-charts/internals';

export type LineChartTypes = {
  data: {
    series: MakeOptional<LineSeriesType, 'type'>[];
    xAxis: MakeOptional<
      AxisConfig<keyof AxisScaleConfig, any, ChartsXAxisProps>,
      'id'
    >[];
    yAxis?: MakeOptional<
      AxisConfig<keyof AxisScaleConfig, any, ChartsYAxisProps>,
      'id'
    >[];
  };
  titleChart?: string;
  loading?: boolean;
};

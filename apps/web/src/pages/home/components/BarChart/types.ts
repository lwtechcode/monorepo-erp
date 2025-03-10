import { BarSeriesType } from '@mui/x-charts';
import {
  AxisConfig,
  AxisScaleConfig,
  ChartsXAxisProps,
  ChartsYAxisProps,
  DatasetType,
  MakeOptional,
} from '@mui/x-charts/internals';

export type BarChartTypes = {
  data: {
    series: MakeOptional<BarSeriesType, 'type'>[];
    xAxis: MakeOptional<
      AxisConfig<keyof AxisScaleConfig, any, ChartsXAxisProps>,
      'id'
    >[];
    yAxis: MakeOptional<
      AxisConfig<keyof AxisScaleConfig, any, ChartsYAxisProps>,
      'id'
    >[];
    dataset?: DatasetType;
  };
  titleChart?: string;
  loading?: boolean;
};

export type BarChartHorizontalTypes = {
  data: {
    series: MakeOptional<BarSeriesType, 'type'>[];
    yAxis: MakeOptional<
      AxisConfig<keyof AxisScaleConfig, any, ChartsYAxisProps>,
      'id'
    >[];
    xAxis?: MakeOptional<
      AxisConfig<keyof AxisScaleConfig, any, ChartsXAxisProps>,
      'id'
    >[];
    dataset: DatasetType;
  };
  titleChart?: string;
  loading?: boolean;
};

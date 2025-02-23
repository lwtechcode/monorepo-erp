import { Statistic as StatisticBase, StatisticProps } from 'antd';

export function Statistic({ ...props }: StatisticProps) {
  return <StatisticBase {...props} />;
}

Statistic.Countdown = StatisticBase.Countdown;

export default Statistic;

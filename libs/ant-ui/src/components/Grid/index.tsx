import { Col, ColProps, Grid as GridBase, Row, RowProps } from 'antd';

function SlotRow({ ...props }: RowProps) {
  return <Row {...props} />;
}

function SlotCol({ ...props }: ColProps) {
  return <Col {...props} />;
}

export const Grid = {
  Row: SlotRow,
  Col: SlotCol,
  Root: GridBase,
};

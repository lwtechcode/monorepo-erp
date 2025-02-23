import { Button, Flex, Icon, Menu, Space, Typography } from '@ant-ui/react';
import { Radio, TableColumnsType } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { FilterUnitOfMeasurement } from '../types';

type UnitOfMeasurement = {
  id: string;
  name: string;
  abbreviation: string;
  active: boolean;
};

type DataTableUnitOfMeasurementsTypes = {
  unitOfMeasurements?: Array<UnitOfMeasurement>;
  handleUnitOfMeasurements?: (unitOfMeasurement: UnitOfMeasurement) => void;
  handleFilterUnitOfMeasurements?: Dispatch<
    SetStateAction<FilterUnitOfMeasurement>
  >;
};

type RenderFilterStatusProps = {
  handleFilterUnitOfMeasurements?: Dispatch<
    SetStateAction<FilterUnitOfMeasurement>
  >;
};

function renderFilterStatus({
  handleFilterUnitOfMeasurements,
}: RenderFilterStatusProps) {
  const [filterValue, setFilterValue] = useState();

  function handleApplyFilter() {
    handleFilterUnitOfMeasurements
      ? handleFilterUnitOfMeasurements((prevState) => ({
          ...prevState,
          status: filterValue,
        }))
      : null;
  }

  function handleClearFilter() {
    handleFilterUnitOfMeasurements
      ? handleFilterUnitOfMeasurements((prevState) => ({
          ...prevState,
          status: undefined,
        }))
      : null;

    setFilterValue(undefined);
  }

  return (
    <Menu>
      <Space className="px-2 py-3" direction="vertical">
        <Radio.Group
          value={filterValue}
          onChange={(value) => setFilterValue(value.target.value)}
        >
          <Space direction="vertical">
            <Radio value="ativo">Ativo</Radio>
            <Radio value="inativo">Inativo</Radio>
          </Space>
        </Radio.Group>

        <Space>
          <Button onClick={handleClearFilter}>Limpar</Button>

          <Button type="primary" onClick={handleApplyFilter}>
            Aplicar
          </Button>
        </Space>
      </Space>
    </Menu>
  );
}

export default function useDataTable({
  unitOfMeasurements,
  handleUnitOfMeasurements,
  handleFilterUnitOfMeasurements,
}: DataTableUnitOfMeasurementsTypes) {
  const columns: TableColumnsType<UnitOfMeasurement> = [
    {
      key: 'name',
      title: 'Nome',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      showSorterTooltip: { title: 'Ordenar por nome' },
      ellipsis: true,
    },
    {
      key: 'abbreviation',
      title: 'Abreviação',
      dataIndex: 'abbreviation',
      ellipsis: true,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      ellipsis: true,
      filterMode: 'menu',
      filterMultiple: false,
      filterDropdown: renderFilterStatus({ handleFilterUnitOfMeasurements }),
      filters: [
        {
          text: 'Ativo',
          value: 'ativo',
        },
        {
          text: 'Inativo',
          value: 'inativo',
        },
      ],
    },
    {
      title: 'Ações',
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (_, record) => (
        <Flex align="center" justify="center">
          <Button
            type="text"
            onClick={() => {
              const unitOfMeasurementsSelected = unitOfMeasurements?.find(
                ({ id }) => {
                  return record.id === id;
                },
              );

              return handleUnitOfMeasurements && unitOfMeasurementsSelected
                ? handleUnitOfMeasurements({
                    ...unitOfMeasurementsSelected,
                  })
                : null;
            }}
          >
            <Icon component="EditOutlined" />
          </Button>
        </Flex>
      ),
    },
  ];

  const data = unitOfMeasurements?.map((unitOfMeasurement) => ({
    key: unitOfMeasurement.id,
    id: unitOfMeasurement.id,
    name: unitOfMeasurement.name || '-',
    abbreviation: unitOfMeasurement.abbreviation || '-',
    status: unitOfMeasurement.active ? (
      <Typography.Text type="success">Ativado</Typography.Text>
    ) : (
      <Typography.Text type="danger">Desativado</Typography.Text>
    ),
  }));

  return {
    columns,
    data,
  };
}

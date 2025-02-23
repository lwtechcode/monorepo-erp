import { Button, Grid, Icon, Modal, Typography } from '@ant-ui/react';
import { useMutation } from '@tanstack/react-query';
import { pdfViewer } from '../../../../utils/functions';
import { pdf } from '../../services';
import { ModalNTFProps } from './types';

export function ModalNTF({ isOpen, onCloseModal, sale_id }: ModalNTFProps) {
  const { mutate } = useMutation({
    mutationFn: pdf,
  });

  function handleViewPDF() {
    mutate(
      { id: sale_id },
      {
        onSuccess: (data) => {
          pdfViewer(data, 'RECIBO');

          onCloseModal();
        },
      },
    );
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onCloseModal}
      onClose={onCloseModal}
      width={360}
      cancelButtonProps={{ hidden: true }}
      okButtonProps={{ hidden: true }}
    >
      <Typography.Title level={4}>Ver Recibo</Typography.Title>

      <Grid.Row align="middle" className="gap-4" justify="center">
        <Grid.Col>
          <Button
            className="rounded-lg bg-gray-100 w-[100px] h-[100px] flex text-center text-wrap flex-col justify-center items-center"
            onClick={handleViewPDF}
          >
            <Icon component="FileOutlined" className="text-lg" />
            <Typography.Text className="text-xs">Ver Recibo</Typography.Text>
          </Button>
        </Grid.Col>
      </Grid.Row>
    </Modal>
  );
}

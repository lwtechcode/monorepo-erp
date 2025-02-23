import { Modal as ModalBase, ModalProps } from 'antd';

export function Modal({ children, ...props }: ModalProps) {
  return (
    <ModalBase centered {...props}>
      {children}
    </ModalBase>
  );
}

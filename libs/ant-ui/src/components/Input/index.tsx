import { Input as InputBase } from 'antd';
import { InputProps } from './types';

export function Input({ ...props }: InputProps) {
  return <InputBase {...props} />;
}

Input.Search = InputBase.Search;
Input.Password = InputBase.Password;
Input.TextArea = InputBase.TextArea;
Input.Group = InputBase.Group;
Input.OTP = InputBase.OTP;

export default Input;

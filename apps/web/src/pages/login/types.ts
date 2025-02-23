import { ReactElement } from 'react';

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type AuthLoginProps = {
  isLoadingAuth: boolean;
  sendAuthRequest: (body: LoginRequestBody) => void;
  isVisibleModalConfirmAccount: boolean;
  setIsVisibleModalConfirmAccount: (status: boolean) => void;
  textConfirmAccount?: ReactElement;
  isVisibleTextVerificationSucess: boolean;
};

export interface IUser {
  userId: string;
  name: string;
  email: string;
  role: string;
  session_id: string,
}

export interface IRegistrationForm {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPass: string;
}

export interface ILoginForm {
  email: string;
  password: string;
  isRemember: boolean;
}

export interface IAuthToken {
  accessToken: string,
  refreshToken: string,
}

export interface IConfirmEmail {
  email: string;
  confirmationCode: string;
}

export interface IRegistrationResponse {
  id: string,
  msg: string;
  email: string;
  confirmationCode: number;
}

export const initialValue = {
  userId: "",
  name: "",
  email: "",
  role: "",
  session_id: "",
}

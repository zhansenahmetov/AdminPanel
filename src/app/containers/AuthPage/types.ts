/* --- STATE --- */

interface RequestState {
  loading?: boolean;
  error?: string;
}
export interface AuthPageState {
  auth: Maybe<String>;
  login: RequestState;
  changePassword: RequestState;
  passwordReset: RequestState;
  resetLink: RequestState;
}

export interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

export interface ChangePasswordPayload {
  changePasswordRequest: {
    password: string;
    token: string;
  };
}

export interface PasswordResetPayload {
  email: string;
}

export interface ResetLinkPayload {
  token: string;
}

export interface ErrorPayload {
  error: string;
}

export type ContainerState = AuthPageState;

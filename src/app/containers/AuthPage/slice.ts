import { Action, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import {
  ContainerState,
  LoginPayload,
  ErrorPayload,
  PasswordResetPayload,
  ChangePasswordPayload,
  ResetLinkPayload,
} from "./types";

// The initial state of the AuthPage container
export const initialState: ContainerState = {
  auth: null,
  login: {
    loading: false,
  },
  passwordReset: {
    loading: false,
  },
  changePassword: {
    loading: false,
  },
  resetLink: {
    loading: false,
  },
};

const authPageSlice = createSlice({
  name: "authPage",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.login.loading = true;
    },
    loginSuccess(state, action: PayloadAction<String>) {
      state.auth = action.payload;
      console.log(action.payload, state.auth);
      state.login.loading = false;
    },
    loginFailure(state, action: PayloadAction<ErrorPayload>) {
      state.login.loading = false;
    },
    passwordReset(state, action: PayloadAction<PasswordResetPayload>) {
      state.passwordReset.loading = true;
    },
    passwordResetSuccess(state, action: Action) {
      state.passwordReset.loading = false;
    },
    passwordResetFailure(state, action: PayloadAction<ErrorPayload>) {
      state.passwordReset.loading = false;
    },
    changePassword(state, action: PayloadAction<ChangePasswordPayload>) {
      state.changePassword.loading = true;
    },
    changePasswordSuccess(state, action: Action) {
      state.changePassword.loading = false;
    },
    changePasswordFailure(state, action: PayloadAction<ErrorPayload>) {
      state.changePassword.loading = false;
    },
    validateResetLink(state, action: PayloadAction<ResetLinkPayload>) {
      state.resetLink.loading = true;
    },
    validateResetLinkSuccess(state, action: Action) {
      state.resetLink.loading = false;
    },
    validateResetLinkFailure(state, action: PayloadAction<ErrorPayload>) {
      state.resetLink.loading = false;
    },
    logout(state, action: Action) {
      state.auth = null;
    },
  },
});

export const { actions: authActions, reducer, name: sliceKey } = authPageSlice;

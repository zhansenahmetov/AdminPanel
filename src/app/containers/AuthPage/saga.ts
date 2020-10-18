import { PayloadAction } from "@reduxjs/toolkit";
import {
  call,
  takeLatest,
  all,
  put,
  take,
  fork,
  cancel,
  cancelled,
} from "redux-saga/effects";
import { api, getToken } from "utils/request";
import { authActions } from "./slice";
import { encode } from "querystring";

import {
  ChangePasswordPayload,
  LoginPayload,
  PasswordResetPayload,
  ResetLinkPayload,
} from "./types";
import { setToken, removeToken } from "../../../utils/request";
import { omit } from "lodash-es";

function* authorize(email, password) {
  try {
    const { token } = yield call(function () {
      return api
        .post("admin/login", {
          json: {
            email,
            password,
          },
        })
        .json();
    });
    yield put(authActions.loginSuccess(token));
    yield call(setToken, token);
  } catch (e) {
    yield put(authActions.loginFailure(e.toString()));
  } finally {
    if (yield cancelled()) {
    }
  }
}

function* loginFlow() {
  while (true) {
    const token = yield call(getToken);

    let task;
    if (!token) {
      //TODO: handle 'remember' field
      const {
        payload: { email, password },
      } = yield take(authActions.login.type);
      task = yield fork(authorize, email, password);
    } else {
      yield put(authActions.loginSuccess(token));
    }

    const action = yield take([
      authActions.logout.type,
      authActions.loginFailure.type,
    ]);
    if (action.type === authActions.logout.type && task) {
      yield cancel(task);
    }
    yield call(removeToken);
  }
}

// export function* doSomething() {}
export function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const response = yield call(function () {
      return api
        .post("admin/login", {
          json: omit(action.payload, "remember"),
        })
        .json();
    });

    if (action.payload.remember) {
      setToken(response.token);
    }

    yield put(authActions.loginSuccess(response.token));
  } catch (e) {
    console.log(e);
    yield put(authActions.loginFailure({ error: e.toString() }));
  }
}

export function* handlePasswordReset(
  action: PayloadAction<PasswordResetPayload>
) {
  try {
    const response = yield call(function () {
      return api
        .post("admin/password-reset", {
          json: action.payload,
        })
        .json();
    });

    console.log(response);
    yield put(authActions.passwordResetSuccess());
  } catch (e) {
    console.log(e);
    yield put(authActions.passwordResetFailure({ error: e.toString() }));
  }
}

export function* handleChangePassword(
  action: PayloadAction<ChangePasswordPayload>
) {
  try {
    const response = yield call(function () {
      return api
        .post("admin/change-password", {
          json: action.payload,
        })
        .json();
    });

    console.log(response);
    yield put(authActions.changePasswordSuccess());
  } catch (e) {
    console.log(e);
    yield put(authActions.changePasswordFailure({ error: e.toString() }));
  }
}

export function* handleResetLink(action: PayloadAction<ResetLinkPayload>) {
  try {
    const response = yield call(function () {
      return api
        .get(`admin/reset-link?${encode(action.payload as any)}`)
        .json();
    });

    console.log(response);
    yield put(authActions.validateResetLinkSuccess());
  } catch (e) {
    console.log(e);
    yield put(authActions.validateResetLinkFailure({ error: e.toString() }));
    window.location.assign("/login");
  }
}

export function* handleLogout() {
  yield call(removeToken);
}

export function* authPageSaga() {
  yield all([
    fork(loginFlow),
    takeLatest(authActions.passwordReset.type, handlePasswordReset),
    takeLatest(authActions.changePassword.type, handleChangePassword),
    takeLatest(authActions.validateResetLink.type, handleResetLink),
    takeLatest(authActions.logout.type, handleLogout),
  ]);
}

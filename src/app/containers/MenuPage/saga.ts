import { PayloadAction } from "@reduxjs/toolkit";
import { api } from "utils/request";
import { call, put, takeLatest } from "redux-saga/effects";
import { actions } from "./slice";

const GET_MENU_ENDPOINT = "restaurant/menu/";

export function* handleGetMenu(action: PayloadAction<number>) {
  try {
    const response = yield call(function () {
      return api.get(`${GET_MENU_ENDPOINT}${action.payload}`);
    });
    console.log(response);
    yield put(actions.getMenuSuccess(response.dishes));
  } catch (e) {
    yield put(actions.getMenuFailure(e));
  }
}

export function* menuPageSaga() {
  yield takeLatest(actions.getMenu.type, handleGetMenu);
}

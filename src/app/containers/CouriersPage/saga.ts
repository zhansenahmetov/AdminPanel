import { CreateCourierPayload } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "utils/request";
import { actions } from "./slice";

// export function* doSomething() {}

const GET_COURIERS_PATH = "courier";
const CREATE_COURIER_PATH = "courier/register";

export function* handleGetCouriers(action) {
  console.log(action.payload);
  try {
    const result = yield call(function () {
      return api.get(GET_COURIERS_PATH).json();
    });
    yield put(actions.getCouriersSuccess(result));
  } catch (e) {
    console.log(e);
    yield put(actions.getCouriersFailure(e));
  }
}

export function* handleCreateCourier(
  action: PayloadAction<CreateCourierPayload>
) {
  try {
    console.log(action.payload);
    console.log("create");
    const result = yield call(function () {
      return api
        .post(CREATE_COURIER_PATH, {
          json: action.payload,
        })
        .json();
    });
    console.log("Courier created");
    yield put(actions.createCourierSuccess(result));
  } catch (e) {
    console.log(e);
    yield put(actions.createCourierFailure(e));
  }
}

export function* couriersPageSaga() {
  yield takeLatest(actions.getCouriers.type, handleGetCouriers);
  yield takeLatest(actions.createCourier.type, handleGetCouriers);
  // yield takeLatest(actions.someAction.type, doSomething);
}

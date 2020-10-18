import { CreateRestaurantPayload } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "utils/request";
import { actions } from "./slice";

// export function* doSomething() {}

const GET_RESTAURANTS_PATH = "restaurant";
const CREATE_RESTAURANT_PATH = "restaurant";

export function* handleGetRestaurants(action) {
  try {
    const result = yield call(function () {
      return api.get(GET_RESTAURANTS_PATH).json();
    });
    yield put(actions.getRestaurantsSuccess(result));
  } catch (e) {
    console.log(e);
    yield put(actions.getRestaurantsFailure(e));
  }
}

export function* handleCreateRestaurant(
  action: PayloadAction<CreateRestaurantPayload>
) {
  try {
    console.log(action.payload);
    const result = yield call(function () {
      return api
        .post(CREATE_RESTAURANT_PATH, {
          json: action.payload,
        })
        .json();
    });
    yield put(actions.createRestaurantSuccess(result));
  } catch (e) {
    console.log(e);
    yield put(actions.createRestaurantFailure(e));
  }
}

export function* restaurantsPageSaga() {
  yield takeLatest(actions.getRestaurants.type, handleGetRestaurants);
  yield takeLatest(actions.createRestaurant.type, handleCreateRestaurant);
  // yield takeLatest(actions.someAction.type, doSomething);
}

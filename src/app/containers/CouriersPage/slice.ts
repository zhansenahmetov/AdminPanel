import { Action, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { ContainerState, CreateCourierPayload, Courier } from "./types";
import { keyBy } from "lodash-es";

// The initial state of the CouriersPage container
export const initialState: ContainerState = {
  entries: {},
};

const couriersPageSlice = createSlice({
  name: "couriersPage",
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    getCouriers(state, action: Action) {},
    getCouriersSuccess(state, action: PayloadAction<Array<Courier>>) {
      state.entries = keyBy(action.payload, "id");
    },
    getCouriersFailure(state, action: PayloadAction<Error>) {},
    createCourier(state, action: PayloadAction<CreateCourierPayload>) {},
    createCourierSuccess(state, action: PayloadAction<Array<Courier>>) {},
    createCourierFailure(state, action: PayloadAction<Error>) {},
  },
});

export const { actions, reducer, name: sliceKey } = couriersPageSlice;

import { keyBy } from "lodash-es";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { ContainerState, Dish } from "./types";

// The initial state of the MenuPage container
export const initialState: ContainerState = {
  loading: false,
  entries: {},
};

const menuPageSlice = createSlice({
  name: "menuPage",
  initialState,
  reducers: {
    getMenu(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    getMenuSuccess(state, action: PayloadAction<Array<Dish>>) {
      state.loading = false;
      state.entries = keyBy(action.payload, "id");
    },
    getMenuFailure(state, action: PayloadAction<string>) {
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = menuPageSlice;

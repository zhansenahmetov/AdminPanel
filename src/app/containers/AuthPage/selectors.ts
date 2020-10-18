import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "types";
import { initialState } from "./slice";

const selectDomain = (state: RootState) => state.authPage || initialState;

export const selectAuthPage = createSelector(
  [selectDomain],
  (authPageState) => authPageState
);

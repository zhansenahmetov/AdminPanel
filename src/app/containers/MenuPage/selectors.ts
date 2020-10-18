import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "types";
import { initialState } from "./slice";

const selectDomain = (state: RootState) => state.menuPage || initialState;

export const selectMenuPage = createSelector(
  [selectDomain],
  (menuPageState) => menuPageState
);

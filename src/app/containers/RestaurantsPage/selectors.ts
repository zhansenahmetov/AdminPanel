import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "types";
import { initialState } from "./slice";

const selectDomain = (state: RootState) =>
  state.restaurantsPage || initialState;

export const selectRestaurantsPage = createSelector(
  [selectDomain],
  (restaurantsPageState) => restaurantsPageState
);

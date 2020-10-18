import { createSelector } from "@reduxjs/toolkit";

import { RootState } from 'types';
import { initialState } from "./slice";

const selectDomain = (state: RootState) =>
  state.couriersPage || initialState;

export const selectCouriersPage = createSelector(
  [selectDomain],
  (couriersPageState) => couriersPageState
);

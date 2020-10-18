import { Action, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { ContainerState, CreateRestaurantPayload, Restaurant } from "./types";
import { keyBy } from "lodash-es";

// The initial state of the RestaurantsPage container
export const initialState: ContainerState = {
  entries: {},
};

const restaurantsPageSlice = createSlice({
  name: "restaurantsPage",
  initialState,
  reducers: {
    getRestaurants(state, action: Action) {},
    getRestaurantsSuccess(state, action: PayloadAction<Array<Restaurant>>) {
      state.entries = keyBy(action.payload, "id");
    },
    getRestaurantsFailure(state, action: PayloadAction<Error>) {},
    createRestaurant(state, action: PayloadAction<CreateRestaurantPayload>) {},
    createRestaurantSuccess(state, action: PayloadAction<Array<Restaurant>>) {},
    createRestaurantFailure(state, action: PayloadAction<Error>) {},
  },
});

export const { actions, reducer, name: sliceKey } = restaurantsPageSlice;

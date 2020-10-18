import { Cuisine } from "../RestaurantsPage/types";
/* --- STATE --- */
export interface MenuPageState {
  loading: boolean;
  error?: string;
  entries: Dictionary<Dish>;
}

export interface Dish {
  available: Boolean;
  composition: String;
  cuisine: Cuisine;
  description: String;
  id: Number;
  name: String;
  pictureUrl: String;
  preparationTimeMinutes: Number;
  price: Number;
}

export interface Menu {
  dishes: Array<Dish>;
  id: Number;
}

export type ContainerState = MenuPageState;

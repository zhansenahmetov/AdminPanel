/* --- STATE --- */
export interface RestaurantsPageState {
  entries: Dictionary<Restaurant>;
}

export type ContainerState = RestaurantsPageState;

export interface Restaurant {
  active: boolean;
  id: Number;
  name: String;
  description: String;
  address: String;
  workHours: String;
  logoUrl: String;
  phoneNumber: String;
  cuisineIds: Array<Number>;
  menuId: Number;
}

export interface Cuisine {
  id: Number;
  name: String;
}

export interface CreateRestaurantPayload {
  address: String;
  cuisineIds: Array<Number>;
  description: String;
  logoUrl: String;
  menuId: Number;
  name: String;
  phoneNumber: String;
  workHours: String;
}

import { AuthPageState } from 'app/containers/AuthPage/types';
import { RestaurantsPageState } from 'app/containers/RestaurantsPage/types';
import { MenuPageState } from 'app/containers/MenuPage/types';
import {CouriersPageState} from 'app/containers/CouriersPage/types';

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  
  authPage?: AuthPageState;
  restaurantsPage?: RestaurantsPageState;
  menuPage?: MenuPageState;
  couriersPage?: CouriersPageState; 
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}

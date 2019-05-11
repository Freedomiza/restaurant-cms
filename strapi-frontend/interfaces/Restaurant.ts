import { IDish } from './Dish';
export interface IRestaurant {
  image: {
    url: string,
  };
  name; string;
  description: string;
  id: string;
  dishes: IDish[];
}

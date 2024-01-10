export interface FoodCardPropsI {
  img: string;
  name: string;
  ingredient: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
}

import { CartItemI } from "db/types";

export interface CartItemsPropsI {
  cartItems: CartItemI[];
  setCartItems: (cartItems: CartItemI[]) => void;
}

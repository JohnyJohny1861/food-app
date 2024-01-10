import { CartItemI } from "db/types";

export interface AddFoodModalPropsI {
  modal: boolean;
  setModal: (open: boolean) => void;
  setCartItems: (cartItems: CartItemI[]) => void;
}

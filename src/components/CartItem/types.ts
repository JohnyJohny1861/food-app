import { CartItemI } from "db/types";

export interface CartItemPropsI extends CartItemI {
  onChange?: (newCount: number) => void;
  onDelete?: (id?: number) => void;
}

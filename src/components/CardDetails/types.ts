import { CartItemI } from "db/types";

export interface CartDetailsPropsI {
  cartItems: CartItemI[];
}

export interface CardErrorI {
  paymentMethod: boolean;
  name: boolean;
  number: boolean;
  expiration: boolean;
  cvv: boolean;
}

export enum PaymentMethodsE {
  master = "master",
  visa = "visa",
  rupay = "rupay",
}

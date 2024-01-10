import { PaymentMethodsE } from "components/CardDetails/types";

export interface OrderI {
  id?: number;
  products: CartItemI[];
  card: CardI;
  subtotal: number;
  shipping: number;
  total: number;
}

export interface CartItemI {
  id?: number;
  img: string;
  name: string;
  ingredient: string;
  count: number;
  price: number;
}

export interface CardI {
  paymentMethod: PaymentMethodsE;
  name: string;
  number: string;
  expiration: string;
  cvv: string;
}

export interface ShippingDbI {
  id: number;
  name: string;
  value: number;
}

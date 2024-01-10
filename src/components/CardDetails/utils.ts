import { CardI } from "db/types";
import { CardErrorI } from "./types";

export const validateCard = (card: CardI): Partial<CardErrorI> => {
  return {
    paymentMethod: !card.paymentMethod,
    name: !card.name,
    number: isValidCardNumber(card.number),
    expiration: isValidExp(card.expiration),
    cvv: isValidCvv(card.cvv),
  };
};

export const isValidExp = (cvv: string) => {
  const [left, right] = cvv.split("/");

  return (
    !left ||
    left.trim().length < 2 ||
    +left > 12 ||
    !right ||
    right.trim().length < 2
  );
};

export const isValidCardNumber = (cardNumber: string) => {
  return !cardNumber || cardNumber.split(" ").join("").length < 16;
};

export const isValidCvv = (cvv: string) => {
  return cvv.trim().length < 3;
};

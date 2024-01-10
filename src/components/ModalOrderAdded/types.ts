import { OrderI } from "db/types";

export interface ModalOrderAddedPropsI {
  modal: boolean;
  orders: OrderI[];
  setModal: (open: boolean) => void;
}

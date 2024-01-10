import Modal from "react-modal";
import { ModalOrderAddedPropsI } from "./types";
import { modalStyles } from "./utils";
import "./style.scss";

export const ModalOrderAdded = ({
  orders,
  modal,
  setModal,
}: ModalOrderAddedPropsI) => {
  return (
    <Modal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      style={modalStyles}
      contentLabel="Your Orders"
    >
      <div className="orders-added">
        {orders.map(({ id, products, total }, i) => (
          <div className="orders-added-item" key={i}>
            <p className="orders-added-item-id">#{id}</p>
            <p className="orders-added-item-names">
              {products.map((prod, j) => (
                <span key={j}>
                  {prod.name}: {prod.count}
                </span>
              ))}
            </p>
            <p className="orders-added-item-total">$ {total}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

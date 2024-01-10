import trashImg from "assets/trash.png";
import { CartItemPropsI } from "./types";
import "./style.scss";

export const CartItem = ({
  img,
  name,
  ingredient,
  count,
  price,
  onChange,
  onDelete,
}: CartItemPropsI) => {
  const handleIncrease = () => {
    onChange?.(count + 1);
  };

  const handeDecrease = () => {
    if (count > 0) {
      onChange?.(count - 1);
    }
  };

  return (
    <div className="cart-item">
      <img className="cart-item-img mr-18" src={img} alt="pizza img" />

      <div className="cart-item-desc">
        <p className="cart-item-desc-name">{name}</p>
        <p className="cart-item-desc-ingredient">{ingredient}</p>
      </div>

      <div className="cart-item-count">
        <span className="cart-item-count-amount">{count}</span>
        <div className="cart-item-count-arrows">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              onClick={handleIncrease}
              d="M20 8.57143L10 0L0 8.57143H20Z"
              fill="#393939"
            />
            <path
              onClick={handeDecrease}
              d="M20 11.4286L10 20L0 11.4286H20Z"
              fill="#393939"
            />
          </svg>
        </div>
      </div>

      <div className="cart-item-price">${price}</div>

      <img
        className="cart-item-trash"
        onClick={() => onDelete?.()}
        src={trashImg}
        alt="trash can"
      />
    </div>
  );
};

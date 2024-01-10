import classNames from "classnames";
import { FoodCardPropsI } from "./types";
import "./style.scss";

export const Food = ({
  img,
  name,
  ingredient,
  price,
  active,
  onClick,
}: FoodCardPropsI) => {
  return (
    <div className={classNames("food-card", { active })} onClick={onClick}>
      <img src={img} alt="pizza img" />
      <div className="food-card-info">
        <p className="food-card-name">{name}</p>
        <p className="food-card-ingredient">{ingredient}</p>
        <p className="food-card-price">${price}</p>
      </div>
    </div>
  );
};

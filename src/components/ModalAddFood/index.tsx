import { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import Modal from "react-modal";
import classNames from "classnames";

import { Food } from "components/Food";
import { modalStyles } from "components/ModalOrderAdded/utils";
import { getTestShippingItems } from "db/utils";
import { CartItemI } from "db/types";
import { CART_ITEMS } from "db";
import { AddFoodModalPropsI } from "./types";
import "./style.scss";

export const ModalAddFood = ({
  modal,
  setModal,
  setCartItems,
}: AddFoodModalPropsI) => {
  const cartItemsDb = useIndexedDB(CART_ITEMS);

  const [foods, setFoods] = useState<CartItemI[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<CartItemI[]>([]);

  useEffect(() => {
    (async () => {
      const testItems = await getTestShippingItems();
      setFoods(testItems);
    })();
  }, []);

  const handleAddToCart = async () => {
    await Promise.all(selectedFoods.map((food) => cartItemsDb.add(food)));
    const cartItems = await cartItemsDb.getAll<CartItemI>();
    setCartItems(cartItems);
    setModal(false);
  };

  const handleSelectedFoods = (food: CartItemI) => {
    const addedFood = selectedFoods.find((el) => el.name === food.name);
    if (addedFood) {
      setSelectedFoods((pre) => pre.filter((el) => el.name !== addedFood.name));
    } else {
      setSelectedFoods((pre) => [...pre, food]);
    }
  };

  return (
    <Modal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      style={modalStyles}
      contentLabel="Add Food To Cart"
    >
      <div className="add-food-modal">
        <div className="add-food-modal-cards">
          {foods.map((food, i) => (
            <Food
              key={i}
              onClick={() => handleSelectedFoods(food)}
              active={!!selectedFoods.find((el) => el.name === food.name)}
              img={food.img}
              name={food.name}
              ingredient={food.ingredient}
              price={food.price}
            />
          ))}
        </div>
        <button
          className={classNames("add-food-modal-btn", {
            disabled: !selectedFoods.length,
          })}
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </Modal>
  );
};

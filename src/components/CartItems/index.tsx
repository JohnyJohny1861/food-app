import { useState } from "react";
import { useIndexedDB } from "react-indexed-db-hook";

import leftArr from "assets/left-arrow.png";

import { CartItem } from "components/CartItem";
import { ModalAddFood } from "components/ModalAddFood";
import { CART_ITEMS } from "db";
import { CartItemsPropsI } from "./types";
import "./style.scss";

export const CartItems = ({ cartItems, setCartItems }: CartItemsPropsI) => {
  const cartItemsDb = useIndexedDB(CART_ITEMS);
  const [addFoodModal, setAddFoodModal] = useState(false);

  const handleCartItemChange = (newCount: number, index: number) => {
    const cartItem = { ...cartItems[index], count: newCount };
    const newCartItems = [...cartItems];
    newCartItems[index] = cartItem;
    setCartItems(newCartItems);
  };

  const handleCartItemDelete = async (index: number) => {
    const deletingFood = { ...cartItems[index] };
    if (deletingFood.id) {
      await cartItemsDb.deleteRecord(deletingFood.id);
      setCartItems(cartItems.filter((el) => el.name !== deletingFood.name));
    }
  };

  return (
    <div className="cart-items">
      <button className="cart-items-back-btn mb-23">
        <img src={leftArr} alt="" />
        Shopping Continue
      </button>

      <div className="cart-items-hr mb-24" />

      {!!cartItems.length ? (
        <>
          <h1 className="cart-items-title">Shopping cart</h1>
          <h1 className="cart-items-info mb-29">
            You have {cartItems.length} items in your cart
          </h1>
        </>
      ) : (
        <>
          <button
            className="cart-items-add-food"
            onClick={() => setAddFoodModal(true)}
          >
            Choose your favourite food
          </button>
          <ModalAddFood
            modal={addFoodModal}
            setModal={setAddFoodModal}
            setCartItems={setCartItems}
          />
        </>
      )}

      <div className="cart-items-items">
        {cartItems.map((cartItem, index) => (
          <CartItem
            {...cartItem}
            key={index}
            onChange={(newCount) => handleCartItemChange(newCount, index)}
            onDelete={() => handleCartItemDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};

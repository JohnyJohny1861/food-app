import { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import { CardDetails } from "components/CardDetails";
import { CartItems } from "components/CartItems";
import { CartItemI } from "db/types";
import { CART_ITEMS } from "db";
import "./style.scss";

export const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemI[]>([]);
  const cartItemsDb = useIndexedDB(CART_ITEMS);

  useEffect(() => {
    (async () => {
      const items = await cartItemsDb.getAll<CartItemI>();
      setCartItems(items);
    })();
  }, [cartItemsDb]);

  return (
    <div className="cart">
      <div className="cart-body">
        <CartItems cartItems={cartItems} setCartItems={setCartItems} />
        <CardDetails cartItems={cartItems} />
      </div>
    </div>
  );
};

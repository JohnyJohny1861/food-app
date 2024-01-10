import { useEffect } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import { Cart } from "./components/Cart";
import { SHIPPING_COST } from "db";

function App() {
  const shippingDb = useIndexedDB(SHIPPING_COST);

  useEffect(() => {
    (async () => {
      const shippingCost = await shippingDb.getByIndex("name", SHIPPING_COST);
      if (!shippingCost) {
        shippingDb.add({ name: SHIPPING_COST, value: 4 });
      }
    })();
  }, [shippingDb]);

  return (
    <div className="app">
      <Cart />
    </div>
  );
}

export default App;

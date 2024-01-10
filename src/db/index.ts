export const ORDERS = "orders";
export const SHIPPING_COST = "shipping_cost";
export const CART_ITEMS = "cart_items";

export const dbConfig = {
  name: "food-db",
  version: 1,
  objectStoresMeta: [
    {
      store: ORDERS,
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
      ],
    },
    {
      store: CART_ITEMS,
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
      ],
    },
    {
      store: SHIPPING_COST,
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
      ],
    },
  ],
};

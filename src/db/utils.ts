import pizzaImg from "assets/pizza.png";
import comboImg from "assets/combo.png";
import spanishImg from "assets/spanish.png";
import { CartItemI } from "./types";

export const imgToBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onload = function (event) {
        const res = event.target?.result as string;
        resolve(res);
      };
      const file = this.response;
      reader.readAsDataURL(file);
    };

    xhr.onerror = () => {
      reject(new Error("Oops something went wrong"));
    };
    xhr.send();
  });
};

export const getTestShippingItems = async (): Promise<CartItemI[]> => {
  const pizzaBase64 = await imgToBase64(pizzaImg);
  const comboBase64 = await imgToBase64(comboImg);
  const spanishBase64 = await imgToBase64(spanishImg);

  return [
    {
      img: pizzaBase64,
      name: "Italy Pizza",
      ingredient: "Extra cheese and toping",
      price: 681,
      count: 1,
    },
    {
      img: comboBase64,
      name: "Combo Plate",
      ingredient: "Extra cheese and toping",
      price: 670,
      count: 1,
    },
    {
      img: spanishBase64,
      name: "Spanish Rice",
      ingredient: "Extra garllic",
      price: 692,
      count: 1,
    },
    {
      img: comboBase64,
      name: "French Pasta",
      ingredient: "Extra tomato and toping",
      price: 420,
      count: 1,
    },
    {
      img: spanishBase64,
      name: "American Chicken",
      ingredient: "Extra garllic",
      price: 590,
      count: 1,
    },
    {
      img: pizzaBase64,
      name: "Turkish Pizza",
      ingredient: "Extra cheese and toping",
      price: 681,
      count: 1,
    },
  ];
};

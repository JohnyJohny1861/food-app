import { useEffect, useState } from "react";
import classNames from "classnames";
import { useIndexedDB } from "react-indexed-db-hook";

import userImg from "assets/user.png";
import masterImg from "assets/master.png";
import visaImg from "assets/visa.png";
import rupayImg from "assets/rupay.png";
import rightArr from "assets/right-arr.png";

import { CardInput } from "components/CardInput";
import { CardPrice } from "components/CardPrice";
import { ModalOrderAdded } from "components/ModalOrderAdded";
import { ORDERS, SHIPPING_COST } from "db";
import { CardI, OrderI, ShippingDbI } from "db/types";
import { CardErrorI, CartDetailsPropsI, PaymentMethodsE } from "./types";
import {
  isValidCardNumber,
  isValidCvv,
  isValidExp,
  validateCard,
} from "./utils";
import "./style.scss";

export const CardDetails = ({ cartItems }: CartDetailsPropsI) => {
  const ordersDb = useIndexedDB(ORDERS);
  const shippingDb = useIndexedDB(SHIPPING_COST);

  const [ordersSumModal, setOrdersSumModal] = useState(false);
  const [orders, setOrders] = useState<OrderI[]>([]);

  const [errors, setErrors] = useState<Partial<CardErrorI>>({});

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodsE>();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [shipping, setShipping] = useState(0);
  const subtotal = cartItems.reduce(
    (sum, val) => val.count * val.price + sum,
    0
  );
  const total = subtotal + shipping;

  useEffect(() => {
    (async () => {
      const shipping: ShippingDbI = await shippingDb.getByIndex(
        "name",
        SHIPPING_COST
      );
      if (shipping) {
        setShipping(shipping.value);
      }
    })();
  }, [shippingDb]);

  const handleCheckErorrs = (errs?: Partial<CardErrorI>) => {
    const values = Object.values(errs || errors);
    return !!values.find((err: boolean) => !!err);
  };

  const handleCheckout = async () => {
    const card: CardI = {
      paymentMethod: paymentMethod!,
      name: cardName,
      number: cardNumber,
      expiration: cardExp,
      cvv: cardCvv,
    };

    const errs = validateCard(card);

    if (!handleCheckErorrs(errs)) {
      const newOrder: OrderI = {
        card,
        shipping,
        subtotal,
        total,
        products: cartItems,
      };

      await ordersDb.add(newOrder);
      const ordersFromDb = await ordersDb.getAll();
      setOrders(ordersFromDb);
      setOrdersSumModal(true);
    } else {
      setErrors(errs);
    }
  };

  return (
    <div className="card-details">
      <h1 className="card-details-title mb-15">
        Card Details
        <img src={userImg} alt="user img" />
      </h1>

      <div className="card-details-type">
        <h3 className="mb-14">Card type</h3>
        <div className="card-details-type-methods mb-27">
          <img
            className={classNames({
              active: paymentMethod === PaymentMethodsE.master,
              error: errors.paymentMethod && !paymentMethod,
            })}
            onClick={() => setPaymentMethod(PaymentMethodsE.master)}
            src={masterImg}
            alt="payment methods"
          />
          <img
            className={classNames({
              active: paymentMethod === PaymentMethodsE.visa,
              error: errors.paymentMethod && !paymentMethod,
            })}
            onClick={() => setPaymentMethod(PaymentMethodsE.visa)}
            src={visaImg}
            alt="payment methods"
          />
          <img
            className={classNames({
              active: paymentMethod === PaymentMethodsE.rupay,
              error: errors.paymentMethod && !paymentMethod,
            })}
            onClick={() => setPaymentMethod(PaymentMethodsE.rupay)}
            src={rupayImg}
            alt="payment methods"
          />
          <button>See all</button>
        </div>
      </div>

      <div className="card-details-inputs">
        <CardInput
          label="Name on card"
          placeholder="Name"
          error={errors.name}
          value={cardName}
          onChange={(e) => {
            setCardName(e.target.value);
          }}
          onBlur={() => {
            setErrors((pre) => ({
              ...pre,
              name: !cardName,
            }));
          }}
        />
        <CardInput
          label="Card number"
          placeholder="1111 2222 3333 4444"
          mask="9999 9999 9999 9999"
          error={errors.number}
          value={cardNumber}
          onChange={(e) => {
            setCardNumber(e.target.value);
          }}
          onBlur={() => {
            setErrors((pre) => ({
              ...pre,
              number: isValidCardNumber(cardNumber),
            }));
          }}
        />
        <div className="d-flex justify-between gap-8">
          <CardInput
            label="Expiration date"
            placeholder="mm/yy"
            mask="99/99"
            error={errors.expiration}
            width="50%"
            value={cardExp}
            onChange={(e) => setCardExp(e.target.value)}
            onBlur={() => {
              setErrors((pre) => ({
                ...pre,
                expiration: isValidExp(cardExp),
              }));
            }}
          />
          <CardInput
            label="CVV"
            placeholder="123"
            mask="999"
            width="50%"
            error={errors.cvv}
            value={cardCvv}
            onChange={(e) => setCardCvv(e.target.value)}
            onBlur={() => {
              setErrors((pre) => ({
                ...pre,
                cvv: isValidCvv(cardCvv),
              }));
            }}
          />
        </div>
      </div>

      <div className="card-details-hr mt-23 mb-15" />

      <div className="card-details-prices">
        <CardPrice label="Subtotal" amount={subtotal} />
        <CardPrice label="Shipping" amount={shipping} />
        <CardPrice label="Total (Tax incl.)" amount={total} />
      </div>

      <button className="card-details-checkout mt-26" onClick={handleCheckout}>
        $1,672
        <p>
          Checkout
          <img src={rightArr} alt="right arr" />
        </p>
      </button>

      {!!orders && (
        <ModalOrderAdded
          orders={orders}
          modal={ordersSumModal}
          setModal={setOrdersSumModal}
        />
      )}
    </div>
  );
};

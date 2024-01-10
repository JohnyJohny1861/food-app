import { CardPriceT } from "./types";
import { NumericFormat } from "react-number-format";
import "./style.scss";

export const CardPrice = ({ label, amount, ...rest }: CardPriceT) => {
  return (
    <div className="card-price" {...rest}>
      <p>{label}</p>
      <NumericFormat
        value={amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
};

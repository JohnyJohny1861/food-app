import InputMask from "react-input-mask";
import { CardInputPropsI } from "./types";
import "./style.scss";

export const CardInput = ({
  label,
  placeholder,
  width,
  mask,
  error,
  ...rest
}: CardInputPropsI) => {
  const style = width ? { width } : {};

  return (
    <div className={`card-input ${error ? "error" : ""}`} style={style}>
      <p>{label}</p>
      <InputMask
        {...rest}
        mask={mask || ""}
        maskChar=" "
        placeholder={placeholder}
      />
    </div>
  );
};

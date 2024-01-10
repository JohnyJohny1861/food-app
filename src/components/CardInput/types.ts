export interface CardInputPropsI
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  error?: boolean;
  mask?: string;
  width?: string;
}

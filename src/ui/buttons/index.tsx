import * as css from "./button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function BlackButton({ children, onClick, type }: ButtonProps) {
  return (
    <button
      className={`${css.root} ${css.black}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export function RedButton({ children, onClick, type }: ButtonProps) {
  return (
    <button className={`${css.root} ${css.red}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export function GreenButton({ children, onClick, type }: ButtonProps) {
  return (
    <button
      className={`${css.root} ${css.green}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export function BlueButton({ children, onClick, type }: ButtonProps) {
  return (
    <button className={`${css.root} ${css.blue}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

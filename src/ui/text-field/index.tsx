import * as css from "./textfield.module.css";

type TextFieldProps = {
  name: string;
  type?: string;
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export function TextField({
  name,
  type,
  ref,
  placeholder,
  onChange,
}: TextFieldProps) {
  return (
    <input
      name={name}
      type={type}
      ref={ref}
      onChange={onChange}
      placeholder={placeholder}
      className={css.root}
    ></input>
  );
}

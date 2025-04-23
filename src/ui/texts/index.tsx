export function Title({ children, className }) {
  return <h1 className={`title ${className}`}>{children}</h1>;
}

export function Subtitle({ children, className }) {
  return <h2 className={`subtitle ${className}`}>{children}</h2>;
}

export function Body({ children, className }) {
  return <p className={`body ${className}`}>{children}</p>;
}

import { button } from './index.css';

export default function Button({
  children,
  ...props
}: React.PropsWithChildren<React.DOMAttributes<HTMLButtonElement>>) {
  return (
    <button className={button} {...props}>
      {children}
    </button>
  );
}

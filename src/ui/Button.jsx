import { Link } from "react-router-dom";

function Button({ children, to, disabled, type, onClick }) {
  const base = `bg-yellow-400 text-sm uppercase text-stone-800 font-semibold tracking-wide 
  rounded-full hover:bg-yellow-300 transition-colors duration-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed `;

  const styles = {
    primary: base + " px-3 py-2",
    secondary: `text-sm uppercase text-stone-400 font-semibold border-2 border-stone-300 px-4 py-2 tracking-wide rounded-full hover:text-stone-800 hover:bg-stone-300 transition-colors duration-500 focus:outline-none focus:ring focus:ring-stone-200 focus:bg-stone-300 
    focus:text-stone-800 focus:ring-offset-2 disabled:cursor-not-allowed`,
    small: base + " px-3 py-2 md:px-4 md:py-3 ",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2",
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;

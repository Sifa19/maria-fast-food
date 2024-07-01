import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigation = useNavigate();
  const className =
    " text-sm text-blue-500 hover:text-blue-900 hover:underline";

  if (to === "-1") {
    return (
      <button className={className} onClick={() => navigation(-1)}>
        {children}
      </button>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;

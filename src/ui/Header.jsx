import { Link, useNavigate } from "react-router-dom";
import Username from "../features/user/Username";
import { useSelector } from "react-redux";
function Header() {
  // const order = 35; //invalid
  // const order = "IIDSAT";

  const userOrderId = useSelector((state) => state.user.orderId);
  const userOrdered = userOrderId !== "";
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();

    //check here if customer has ordered
    //then show customer his order
    //or else show the customer "no order your cart is empty"
    if (userOrderId) {
      navigate(`order/${userOrderId}`);
    } else navigate("/add");
  }
  return (
    <header
      className=" bg-yellow-400 uppercase p-4 sm:px-6 border-b-4 border-stone-300 flex justify-between items-center
      font-sans "
    >
      <Link to="/" className="tracking-widest sm:text-lg font-bold">
        Maria Fast Food Co.
      </Link>{" "}
      <br />
      {/* <Link to={`/order/${order}`}>View Order</Link> */}
      <div className="flex items-center space-x-4">
        {userOrdered && (
          <button
            onClick={(e) => handleClick(e)}
            className=" text-xs sm:text-base border-[1px] border-stone-800 uppercase text-stone-800  px-4 py-1  rounded-full 
        transition-all duration-500
        hover:bg-yellow-200 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-50 focus:border-none"
          >
            View Order
          </button>
        )}
        <Username />
      </div>
    </header>
  );
}

export default Header;

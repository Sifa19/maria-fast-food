import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  // const { cart } = useSelector((state) => state.cart);

  // const quantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // const totalPrice = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

  // const quantity = useSelector((state) =>
  //   state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
  // );
  // const totalPrice = useSelector((state) =>
  //   state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
  // );

  const totalPrice = useSelector(getTotalCartPrice);
  const totalQuantity = useSelector(getTotalCartQuantity);

  if (!totalQuantity) return null;

  return (
    <div className=" bg-stone-800 text-stone-200 uppercase p-4 sm:px-6 text-sm md:text-base flex items-center justify-between">
      <p className="text-stone-400 font-semibold space-x-4 sm:space-x-6 ">
        <span>{totalQuantity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Order cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

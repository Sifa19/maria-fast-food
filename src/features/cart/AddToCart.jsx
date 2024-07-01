import { Link } from "react-router-dom";
function AddToCart() {
  return (
    <div>
      <p>your cart is empty.</p>
      <Link to="/menu">Order Now</Link>
    </div>
  );
}

export default AddToCart;

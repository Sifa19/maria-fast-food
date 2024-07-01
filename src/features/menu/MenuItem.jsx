import PropTypes from "prop-types";
// import { formatCurrency } from "../../utilities/helpers.js";
import { formatCurrency } from "../../utilities/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, imageUrl, name, ingredients, unitPrice, soldOut } = pizza;

  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const pizza = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(pizza));
  }
  return (
    <li className="flex flex-col gap-4 py-2 md:flex-row">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col grow gap-2 sm:gap-0">
        <p className=" font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">
          {ingredients.reduce((curr, acc) => {
            return acc + "," + curr;
          })}
        </p>
        <div className="mt-auto text-sm flex items-center justify-between">
          {soldOut ? (
            <span className="font-medium uppercase text-stone-500">
              SOLD OUT
            </span>
          ) : (
            <span>${formatCurrency(unitPrice)}$</span>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity id={id} quantity={currentQuantity} />
              <DeleteItem id={id}>Remove</DeleteItem>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.node.isRequired,
};
export default MenuItem;

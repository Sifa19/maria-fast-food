import Loader from "../../ui/Loader";
import { formatCurrency } from "../../utilities/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  isLoadingIngredients;
  ingredients;

  if (isLoadingIngredients) return <Loader />;
  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm mt-2 capitalize italic text-stone-500">
        {ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;

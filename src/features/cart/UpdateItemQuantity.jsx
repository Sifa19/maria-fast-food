import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ id, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>
      <input
        type="text"
        className="w-5 text-center bg-inherit"
        value={quantity}
      />
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;

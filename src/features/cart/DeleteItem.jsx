import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteItem({ id, children }) {
  const dispatch = useDispatch();

  function handleDeleteItem() {
    dispatch(deleteItem(id));
  }
  return (
    <Button type="small" onClick={handleDeleteItem}>
      {children}
    </Button>
  );
}

export default DeleteItem;

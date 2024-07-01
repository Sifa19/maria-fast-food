/* eslint-disable no-unused-vars */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
      <input type="hidden" name="order" value={JSON.stringify(order)} />
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = JSON.parse(data.order);
  const orderId = order.id;
  const updateData = { priority: true };
  await updateOrder(orderId, updateData);
  return null;
}

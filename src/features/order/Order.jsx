/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helpers";
import OrderItem from "./OrderItem";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";
import { useDispatch } from "react-redux";
import { updateOrderId } from "../user/userSlice";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const fetcher = useFetcher();
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/menu");
      }
    },
    [fetcher]
  );

  useEffect(
    function () {
      dispatch(updateOrderId(order.id));
    },
    [dispatch, order.id]
  );

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="text-xl font-semibold">Order #{id} status</h1>

        <div>
          {priority ? (
            <span className="bg-red-500 rounded-full px-3 py-1 text-xs uppercase font-semibold text-red-50 tracking-wide">
              Priority Order
            </span>
          ) : (
            ""
          )}
          <span className="bg-green-500 rounded-full px-3 py-1 text-xs uppercase font-semibold text-red-50 tracking-wide ml-2">
            Preparing Order
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap bg-stone-200 px-4 py-4 rounded-md">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimted delivery:{formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-t-2  border-b-2">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((data) => data.id === item.pizzaId).ingredients
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-4 py-4 rounded-md">
        <p className="text-sm font-medium text-stone-600">
          {" "}
          Pizza Price: {formatCurrency(orderPrice)}
        </p>

        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}

        <p className="font-bold">
          To pay on delivery:{formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const orderId = params.orderID;
  // console.log(orderId);
  const loader = await getOrder(orderId);
  return loader;
}

export default Order;

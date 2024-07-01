/* eslint-disable no-unused-vars */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";
import { fetchAddress, updateOrderId } from "../user/userSlice";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const {
    username,
    status,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = status === "loading";
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.25 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (cart.length)
    return (
      <div className="px-4 py-6">
        <Form method="POST" className="flex flex-col">
          <h1 className="text-xl font-semibold mb-8">
            Ready to order? Let&apos;s go!
          </h1>
          <div className="mb-5 flex flex-col gap-2 sm:flex sm:flex-row sm:items-center">
            <label className="sm:basis-40">First Name</label>
            <input
              className="input"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
          <div className="mb-5 flex flex-col gap-2 sm:flex sm:flex-row sm:items-center">
            <label className="sm:basis-40">Phone Number</label>
            <input className="input" type="text" name="phone" required />
          </div>
          {formErrors?.phone && (
            <div className="w-full sm:w-[79%] text-xs mb-2 mt-[-15px] text-red-700 bg-red-100 rounded-full px-5 py-1 self-end">
              {formErrors.phone}
            </div>
          )}
          <div className="mb-5 flex flex-col gap-2 sm:flex sm:flex-row sm:items-center relative">
            <label className="sm:basis-40">Address</label>
            <div className="flex w-full">
              <input
                className="input w-full"
                type="text"
                name="address"
                disabled={isLoadingAddress}
                defaultValue={address}
                required
              />
              {!position.latitude && !position.longitude && (
                <span className="absolute right-0">
                  <Button
                    disabled={isLoadingAddress || isSubmitting}
                    type="small"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(fetchAddress());
                    }}
                  >
                    Get&nbsp;Position
                  </Button>
                </span>
              )}
            </div>
          </div>
          {status === "error" && (
            <div className="w-full sm:w-[79%] text-xs mb-2 mt-[-15px] text-red-700 bg-red-100 rounded-full px-5 py-1 self-end">
              {errorAddress}
            </div>
          )}

          <div className=" mb-12 flex gap-5 items-center font-medium">
            <input
              className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring
            focus:ring-yellow-400
            focus:ring-offset-2"
              type="checkbox"
              name="priority"
              onClick={(e) => setWithPriority(e.target.checked)}
            />
            want to give your oder priority?
          </div>

          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />

          <div className=" justify-self-end">
            <Button disabled={isSubmitting} type="primary">
              {isSubmitting
                ? "Placing Order"
                : `Order Now from ${formatCurrency(totalPrice)}`}
            </Button>
          </div>
        </Form>
      </div>
    );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true" ? true : false,
  };

  // console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please enter correct phone number";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

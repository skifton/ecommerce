import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {
  useDeleteCartItem,
  useGetCartList,
  useUpdateCartItem,
} from "../../services/cart.service";
import {
  useGetSession,
  useUpdateSession,
} from "../../services/shopping-session.service";
import CartList from "./CartList";
import { orderPolicies } from "../../constants/policies";
import { enqueueSnackbar } from "notistack";

const Cart: React.FC = () => {
  const context = useContext(AuthContext);
  const userId = context?.user?.userId;
  const session_id = context?.user?.session_id;
  const { session } = useGetSession(userId ? userId : "");
  const { mutate: updateSession } = useUpdateSession();
  const { cartItems } = useGetCartList(session_id ? session_id : "");
  const { mutate: updateCartItem } = useUpdateCartItem();
  const { mutate: deleteItem } = useDeleteCartItem(
    () => {
      enqueueSnackbar("This item was successfully deleted from your cart!", {
        variant: "success",
      });
    },
    () => {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  );
  const navigate = useNavigate();

  const onDeleteClickHandler = (id: string, price: number, quantity: number) => {
    deleteItem(id);
    updateSession({
      id: userId ? userId : "",
      params: { price: price * quantity, operation: "REMOVE" },
    });
    window.location.reload();
  };

  const onClickCheckoutHandler = () => {
    navigate(`/checkout/${session_id}`);
  };

  const onIncrementQuantityHandler = (
    id: string,
    params: { quantity: number },
    price: number
  ) => {
    updateCartItem({ id, params });
    updateSession({
      id: userId ? userId : "",
      params: { price: price, operation: "ADD" },
    });
  };

  const onDecrementQuantityHandler = (
    id: string,
    params: { quantity: number },
    price: number
  ) => {
    updateCartItem({ id, params });    updateSession({
      id: userId ? userId : "",
      params: { price: price, operation: "REMOVE" },
    });
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl pt-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h1>

          <form className="mt-12">
            <section aria-labelledby="cart-heading">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <CartList
                products={cartItems}
                onDeleteClick={onDeleteClickHandler}
                onIncrementQuantity={onIncrementQuantityHandler}
                onDecrementQuantity={onDecrementQuantityHandler}
              />
            </section>

            <section
              aria-labelledby="summary-heading"
              className="mt-10 sm:ml-32 sm:pl-6"
            >
              <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                <h2 id="summary-heading" className="sr-only">
                  Order summary
                </h2>

                <div className="flow-root">
                  <dl className="-my-4 divide-y divide-gray-200 text-sm">
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-base font-medium text-gray-900">
                        Order total
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        {session?.total}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-10">
                <button
                  type="button"
                  onClick={onClickCheckoutHandler}
                  disabled={cartItems?.length === 0}
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  or
                  <Link
                    to=".."
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </section>
          </form>
        </div>
      </div>

      <section
        aria-labelledby="policies-heading"
        className="mt-24 border-t border-gray-200 bg-gray-50"
      >
        <h2 id="policies-heading" className="sr-only">
          Our policies
        </h2>

        <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {orderPolicies.map((policy) => (
              <div
                key={policy.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0">
                  <div className="flow-root">
                    <img
                      className="-my-1 mx-auto h-24 w-auto"
                      src={policy.imageSrc}
                      alt={policy.name}
                    />
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                  <h3 className="text-base font-medium text-gray-900">
                    {policy.name}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500">
                    {policy.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;

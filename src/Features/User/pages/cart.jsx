import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  selectCartItems,
  getCartStatus,
  getCartError,
} from "../../../Redux/Slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const status = useSelector(getCartStatus);
  const error = useSelector(getCartError);

  const userId = useSelector((state) => state.userAuth.userId);
  const total = useSelector((state) => state.cart.discountedTotal);

  useEffect(() => {
    if (userId && status === "idle") {
      dispatch(fetchCart(userId)); // ✅ PASS ID
    }
  }, [userId, status, dispatch]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 bg-white p-4 rounded-xl shadow"
              >
                <img
                  src={item.productId?.images?.[0] || "/no-image.png"}
                  alt={item.productId?.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {item.productId?.title}
                  </h2>

                  <p className="text-gray-500">
                    ₹{item.price}
                  </p>

                  <p className="mt-2 text-sm">
                    Color:{" "}
                    <span className="font-semibold">
                      {item.color}
                    </span>
                  </p>

                  <p className="text-sm">
                    Size:{" "}
                    <span className="font-semibold">
                      {item.size}
                    </span>
                  </p>

                  <p className="text-sm">
                    Quantity:{" "}
                    <span className="font-semibold">
                      {item.quantity}
                    </span>
                  </p>
                </div>

                <div className="text-right font-semibold">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-xl shadow h-fit">
            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg border-t pt-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;

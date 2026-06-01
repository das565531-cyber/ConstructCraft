import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { createOrder } from "../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const handleOrder = async () => {
    try {
      await createOrder(total, cart);
      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.log(error);
      alert("Failed to Place Order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 pb-16">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-lg text-center">
            <h2 className="text-3xl font-bold">
              No items to checkout
            </h2>

            <Link
              to="/marketplace"
              className="inline-block mt-6 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold"
            >
              Go To Materials
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-lg">
              <h2 className="text-2xl font-bold mb-5">
                Delivery Details
              </h2>

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-4 rounded-xl mb-4"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border p-4 rounded-xl mb-4"
              />

              <textarea
                placeholder="Delivery Address"
                className="w-full border p-4 rounded-xl mb-4"
                rows="4"
              ></textarea>

              <input
                type="text"
                placeholder="City"
                defaultValue="Kolkata"
                className="w-full border p-4 rounded-xl"
              />
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg h-fit">
              <h2 className="text-2xl font-bold mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm border-b pb-2"
                  >
                    <span>{item.name}</span>
                    <span>₹ {Number(item.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-2xl font-bold border-t pt-4">
                <span>Total</span>
                <span className="text-orange-500">
                  ₹ {total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleOrder}
                className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition"
              >
                Place Order
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Checkout;
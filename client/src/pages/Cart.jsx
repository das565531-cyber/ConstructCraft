import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-orange-50 pt-28 px-6 pb-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-10">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-lg text-center">
            <h2 className="text-3xl font-bold">Your cart is empty</h2>
            <Link
              to="/marketplace"
              className="inline-block mt-6 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold"
            >
              Shop Materials
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-3xl shadow flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-orange-500 font-bold">
                      ₹{Number(item.price).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 px-4 py-2 rounded-xl font-bold"
                    >
                      -
                    </button>

                    <span className="font-bold text-xl">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <p className="flex justify-between mb-3">
                <span>Items</span>
                <span>{cart.length}</span>
              </p>

              <h3 className="text-3xl font-bold text-orange-500 mt-6">
                ₹{total.toLocaleString()}
              </h3>

              <Link
                to="/checkout"
                className="block text-center mt-6 bg-green-600 text-white py-4 rounded-xl font-bold"
              >
                Proceed To Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
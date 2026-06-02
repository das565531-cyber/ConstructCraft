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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 pt-28 px-6 pb-16 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-orange-300 font-bold">ConstructCraft Cart</p>
          <h1 className="text-5xl font-extrabold mt-2">Your Materials Cart</h1>
          <p className="text-slate-300 mt-3">
            Review quantities, update materials and continue to secure checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white/10 border border-white/10 p-12 rounded-[2rem] shadow-2xl text-center">
            <div className="text-7xl mb-5">🛒</div>
            <h2 className="text-3xl font-bold">Your cart is empty</h2>

            <Link
              to="/marketplace"
              className="inline-block mt-6 bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition"
            >
              Shop Materials
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white text-slate-900 p-5 rounded-[2rem] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-3xl bg-orange-100 flex items-center justify-center text-4xl">
                      🧱
                    </div>

                    <div>
                      <h2 className="text-xl font-extrabold">{item.name}</h2>
                      <p className="text-slate-500 text-sm">Construction material</p>
                      <p className="text-orange-500 font-extrabold mt-1">
                        ₹{Number(item.price).toLocaleString()} / unit
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center bg-slate-100 rounded-2xl p-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-10 h-10 rounded-xl bg-white shadow font-extrabold hover:bg-slate-200 transition"
                      >
                        -
                      </button>

                      <span className="w-12 text-center font-extrabold text-xl">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-10 h-10 rounded-xl bg-orange-500 text-white shadow font-extrabold hover:bg-orange-600 transition"
                      >
                        +
                      </button>
                    </div>

                    <div className="min-w-28 text-right">
                      <p className="text-lg font-extrabold">
                        ₹{(Number(item.price) * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl h-fit sticky top-28">
              <h2 className="text-2xl font-extrabold mb-6">Order Summary</h2>

              <div className="space-y-4 text-slate-600">
                <p className="flex justify-between">
                  <span>Total items</span>
                  <span className="font-bold text-slate-900">{cart.length}</span>
                </p>

                <p className="flex justify-between">
                  <span>Total quantity</span>
                  <span className="font-bold text-slate-900">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </p>
              </div>

              <div className="border-t mt-6 pt-6">
                <p className="text-slate-500">Subtotal</p>
                <h3 className="text-4xl font-extrabold text-orange-500 mt-2">
                  ₹{total.toLocaleString()}
                </h3>
              </div>

              <Link
                to="/checkout"
                className="block text-center mt-6 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition"
              >
                Proceed To Checkout
              </Link>

              <Link
                to="/marketplace"
                className="block text-center mt-3 bg-slate-100 text-slate-800 py-4 rounded-2xl font-bold hover:bg-slate-200 transition"
              >
                Add More Materials
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
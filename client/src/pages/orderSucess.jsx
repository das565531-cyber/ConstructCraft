import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 pt-28 px-6 pb-16">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[2rem] shadow-xl text-center">
        <div className="text-7xl mb-6">✅</div>

        <h1 className="text-5xl font-extrabold text-slate-900">
          Order Placed Successfully
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Your construction materials order has been placed. You can track your
          order status from your dashboard.
        </p>

        <div className="bg-slate-100 rounded-3xl p-6 mt-8 text-left">
          <h2 className="text-2xl font-bold mb-4">What happens next?</h2>

          <div className="space-y-4">
            {[
              "Order placed",
              "Supplier confirmation",
              "Material packing",
              "Out for delivery",
              "Delivered to site",
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <p className="font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            to="/dashboard"
            className="bg-orange-500 text-white px-7 py-4 rounded-xl font-bold hover:bg-orange-600 transition"
          >
            Go To Dashboard
          </Link>

          <Link
            to="/marketplace"
            className="bg-slate-900 text-white px-7 py-4 rounded-xl font-bold hover:bg-black transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 flex items-center justify-center">
      <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg">
        <div className="text-6xl text-green-600 mb-4">
          ✓
        </div>

        <h1 className="text-4xl font-bold mb-4">
          Order Placed Successfully
        </h1>

        <p className="text-gray-500 mb-8">
          Your construction material order has been confirmed.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/marketplace"
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold"
          >
            Continue Shopping
          </Link>

          <Link
            to="/dashboard"
            className="border border-orange-500 text-orange-500 px-6 py-3 rounded-xl font-bold"
          >
            Go To Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
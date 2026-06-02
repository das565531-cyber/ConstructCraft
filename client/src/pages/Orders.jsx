import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getUserOrders } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const steps = [
    "Placed",
    "Confirmed",
    "Processing",
    "Packed",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status) => {
    const index = steps.findIndex((step) => step === status);
    return index === -1 ? 0 : index;
  };

  const getPaymentBadge = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    if (status === "Failed") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-orange-500 font-bold mb-2">Order Management</p>

        <h1 className="text-5xl font-extrabold text-slate-900">
          My Orders
        </h1>

        <p className="text-slate-500 mt-3">
          Track material purchases, payment status and delivery progress.
        </p>
      </div>

      {loading ? (
        <div className="bg-white p-8 rounded-3xl shadow">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl shadow text-center">
          <h2 className="text-3xl font-bold">No orders yet</h2>
          <p className="text-slate-500 mt-3">
            Your material orders will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const activeStep = getStepIndex(order.status);

            return (
              <div
                key={order.id}
                className="bg-white rounded-[2rem] shadow p-7"
              >
                <div className="flex flex-wrap justify-between gap-5 border-b pb-5">
                  <div>
                    <h2 className="text-2xl font-extrabold">
                      Order #{order.id.slice(0, 8)}
                    </h2>

                    <p className="text-slate-500 mt-1">
                      {new Date(order.created_at).toLocaleString()}
                    </p>

                    <p className="text-slate-500 mt-1">
                      Payment: {order.payment_method}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-orange-500">
                      ₹{Number(order.total_amount || 0).toLocaleString()}
                    </p>

                    <span
                      className={`inline-block mt-3 px-4 py-2 rounded-full font-bold ${getPaymentBadge(
                        order.payment_status
                      )}`}
                    >
                      {order.payment_status}
                    </span>
                  </div>
                </div>

                <div className="mt-7">
                  <h3 className="text-xl font-bold mb-5">
                    Delivery Progress
                  </h3>

                  <div className="grid md:grid-cols-7 gap-4">
                    {steps.map((step, index) => (
                      <div key={step} className="text-center">
                        <div
                          className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center font-bold ${
                            index <= activeStep
                              ? "bg-orange-500 text-white"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {index <= activeStep ? "✓" : index + 1}
                        </div>

                        <p
                          className={`mt-2 text-sm font-semibold ${
                            index <= activeStep
                              ? "text-slate-900"
                              : "text-slate-400"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {order.items?.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">
                      Ordered Materials
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="bg-slate-100 p-4 rounded-2xl"
                        >
                          <h4 className="font-bold">{item.name}</h4>

                          <p className="text-slate-500">
                            Qty: {item.quantity}
                          </p>

                          <p className="text-orange-500 font-bold">
                            ₹{Number(item.price).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {order.delivery && (
                  <div className="mt-8 bg-slate-950 text-white p-5 rounded-2xl">
                    <h3 className="text-xl font-bold mb-3">
                      Delivery Address
                    </h3>

                    <p>{order.delivery.name}</p>
                    <p>{order.delivery.phone}</p>
                    <p>{order.delivery.address}</p>
                    <p>{order.delivery.city}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Orders;
import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import supabase from "../services/supabase";
import { updateOrderStatus } from "../services/orderService";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statuses = [
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
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load admin orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      await loadOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to update order status");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-orange-500 font-bold mb-2">Admin Panel</p>

        <h1 className="text-5xl font-extrabold text-slate-900">
          Manage Orders
        </h1>

        <p className="text-slate-500 mt-3">
          Update order delivery status for customer tracking.
        </p>
      </div>

      {loading ? (
        <div className="bg-white p-8 rounded-3xl shadow">
          Loading admin orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl shadow text-center">
          <h2 className="text-3xl font-bold">No orders found</h2>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-7 rounded-3xl shadow"
            >
              <div className="flex flex-wrap justify-between gap-5">
                <div>
                  <h2 className="text-2xl font-extrabold">
                    Order #{order.id.slice(0, 8)}
                  </h2>

                  <p className="text-slate-500 mt-1">
                    Customer: {order.user_email}
                  </p>

                  <p className="text-slate-500">
                    Payment: {order.payment_method} / {order.payment_status}
                  </p>

                  <p className="text-slate-500">
                    Date: {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-extrabold text-orange-500">
                    ₹{Number(order.total_amount || 0).toLocaleString()}
                  </p>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="mt-4 border p-3 rounded-xl font-bold"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {order.items?.length > 0 && (
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-slate-100 p-4 rounded-2xl"
                    >
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-slate-500">Qty: {item.quantity}</p>
                      <p className="text-orange-500 font-bold">
                        ₹{Number(item.price).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminOrders;
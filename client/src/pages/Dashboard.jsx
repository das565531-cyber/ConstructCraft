import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getDashboardStats } from "../services/dashboardService";
import { getUserProjects } from "../services/projectService";
import { getSavedBuilders } from "../services/savedBuilderService";
import { getUserOrders } from "../services/orderService";

function Dashboard() {
  const [stats, setStats] = useState({
    orderCount: 0,
    builderCount: 0,
    productCount: 0,
  });

  const [savedBuilders, setSavedBuilders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const statsData = await getDashboardStats();
      const projectData = await getUserProjects();
      const savedBuilderData = await getSavedBuilders();
      const orderData = await getUserOrders();

      setStats(statsData || {});
      setProjects(projectData || []);
      setSavedBuilders(savedBuilderData || []);
      setOrders(orderData || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const getProjectProgress = (project) => {
    if (!project?.stages || project.stages.length === 0) return 0;

    const completed = project.stages.filter(
      (stage) => stage.status === "Completed"
    ).length;

    return Math.round((completed / project.stages.length) * 100);
  };

  const getPaymentBadge = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    if (status === "Failed") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  const orderTotal = orders.reduce(
    (sum, order) => sum + Number(order.total_amount || 0),
    0
  );

  return (
    <DashboardLayout>
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-orange-600 text-white p-8 md:p-10 rounded-[2rem] shadow-2xl mb-8">
        <p className="text-orange-200 font-bold mb-2">
          Welcome back, Souvik 👋
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold">
          Construction Command Center
        </h1>

        <p className="mt-4 max-w-2xl text-white/80">
          Track your projects, orders, builders and construction progress from
          one powerful dashboard.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <Link
            to="/tracker"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-2xl font-bold transition"
          >
            Manage Projects
          </Link>

          <Link
            to="/marketplace"
            className="bg-white text-slate-950 px-6 py-3 rounded-2xl font-bold hover:bg-slate-100 transition"
          >
            Buy Materials
          </Link>
        </div>
      </section>

      {loading ? (
        <div className="bg-white p-8 rounded-3xl shadow">
          Loading dashboard data...
        </div>
      ) : (
        <>
          <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              ["My Orders", orders.length, "📦"],
              ["Order Value", `₹${orderTotal.toLocaleString()}`, "💰"],
              ["Saved Builders", savedBuilders.length, "👷"],
              ["My Projects", projects.length, "🏗️"],
            ].map(([title, value, icon]) => (
              <div
                key={title}
                className="bg-white p-6 rounded-3xl shadow hover:-translate-y-1 hover:shadow-xl transition"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <p className="text-slate-500 font-semibold">{title}</p>
                <h2 className="text-4xl font-extrabold text-slate-950 mt-2">
                  {value}
                </h2>
              </div>
            ))}
          </section>

          <section className="grid xl:grid-cols-3 gap-6 mt-8">
            <div className="xl:col-span-2 bg-white p-7 rounded-3xl shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold">Project Progress</h2>

                <Link
                  to="/tracker"
                  className="text-orange-500 font-bold hover:underline"
                >
                  Open Tracker
                </Link>
              </div>

              {projects.length === 0 ? (
                <p className="text-slate-500">
                  No projects created yet. Create your first project from the
                  Tracker page.
                </p>
              ) : (
                <div className="space-y-6">
                  {projects.slice(0, 4).map((project) => {
                    const progress = getProjectProgress(project);

                    return (
                      <div key={project.id}>
                        <div className="flex justify-between font-bold">
                          <p>{project.name}</p>
                          <p className="text-orange-500">{progress}%</p>
                        </div>

                        <p className="text-sm text-slate-500">
                          {project.type} • {project.location}
                        </p>

                        <div className="bg-slate-200 h-3 rounded-full mt-3 overflow-hidden">
                          <div
                            className="bg-orange-500 h-full rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-slate-950 text-white p-7 rounded-3xl shadow">
              <h2 className="text-2xl font-extrabold mb-6">Quick Actions</h2>

              <div className="space-y-4">
                {[
                  ["Create Project", "/tracker"],
                  ["Find Builder", "/builders"],
                  ["Buy Materials", "/marketplace"],
                  ["View Orders", "/dashboard/orders"],
                ].map(([label, path]) => (
                  <Link
                    key={label}
                    to={path}
                    className="block bg-white/10 hover:bg-orange-500 p-4 rounded-2xl font-bold transition"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white p-7 rounded-3xl shadow mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold">Recent Orders</h2>

              <Link
                to="/dashboard/orders"
                className="bg-orange-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-600 transition"
              >
                View All Orders
              </Link>
            </div>

            {orders.length === 0 ? (
              <p className="text-slate-500">
                No orders found. Add materials to cart and place your first
                order.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="border border-slate-200 p-5 rounded-2xl hover:shadow-lg transition"
                  >
                    <div className="flex flex-wrap justify-between gap-4">
                      <div>
                        <h3 className="font-extrabold text-lg">
                          Order #{order.id.slice(0, 8)}
                        </h3>

                        <p className="text-slate-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>

                        <p className="text-slate-500">
                          Method: {order.payment_method || "Not selected"}
                        </p>

                        <span
                          className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-bold ${getPaymentBadge(
                            order.payment_status
                          )}`}
                        >
                          {order.payment_status || "Pending"}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-extrabold text-orange-500">
                          ₹{Number(order.total_amount || 0).toLocaleString()}
                        </p>

                        <p className="text-slate-500">
                          {order.items?.length || 0} items
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
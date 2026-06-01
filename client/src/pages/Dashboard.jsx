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

  const getProjectProgress = (project) => {
    if (!project?.stages || project.stages.length === 0) return 0;

    const completed = project.stages.filter(
      (stage) => stage.status === "Completed"
    ).length;

    return Math.round((completed / project.stages.length) * 100);
  };

  const loadDashboardData = async () => {
    try {
      const statsData = await getDashboardStats();
      const projectData = await getUserProjects();
      const savedBuilderData = await getSavedBuilders();
      const orderData = await getUserOrders();

      setStats(statsData);
      setProjects(projectData);
      setSavedBuilders(savedBuilderData);
      setOrders(orderData);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard data");
    }

    setLoading(false);
  };

  const orderTotal = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-[2rem] mb-8 shadow-xl">
        <h1 className="text-5xl font-extrabold">
          Construction Command Center
        </h1>

        <p className="mt-3 text-white/90">
          Track orders, materials, builders and project progress from one smart dashboard.
        </p>
      </div>

      {loading ? (
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          Loading dashboard data...
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              ["My Orders", orders.length, "📦"],
              ["Order Value", `₹${orderTotal.toLocaleString()}`, "💰"],
              ["Saved Builders", savedBuilders.length, "❤️"],
              ["My Projects", projects.length, "📊"],
            ].map(([title, value, icon]) => (
              <div
                key={title}
                className="bg-white p-6 rounded-3xl shadow-xl hover:-translate-y-2 transition"
              >
                <div className="text-4xl mb-3">
                  {icon}
                </div>

                <h2 className="text-gray-500">
                  {title}
                </h2>

                <p className="text-4xl font-extrabold text-orange-500 mt-3">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-10">
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  My Project Progress
                </h2>

                <Link
                  to="/tracker"
                  className="text-orange-500 font-bold hover:underline"
                >
                  Open Tracker
                </Link>
              </div>

              {projects.length === 0 ? (
                <p className="text-gray-500">
                  No projects created yet. Go to Tracker and create your first project.
                </p>
              ) : (
                <div className="space-y-6">
                  {projects.slice(0, 3).map((project) => {
                    const progress = getProjectProgress(project);

                    return (
                      <div key={project.id}>
                        <div className="flex justify-between font-semibold">
                          <p>{project.name}</p>
                          <p>{progress}%</p>
                        </div>

                        <p className="text-gray-500 text-sm">
                          {project.type} • {project.location}
                        </p>

                        <div className="bg-gray-200 h-4 rounded-full mt-3">
                          <div
                            className="bg-orange-500 h-4 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-slate-950 text-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6">
                Recent Activity
              </h2>

              <ul className="space-y-4">
                <li className="bg-white/10 p-4 rounded-2xl">
                  ✔ Orders loaded from Supabase
                </li>

                <li className="bg-white/10 p-4 rounded-2xl">
                  ✔ Project data loaded from Supabase
                </li>

                <li className="bg-white/10 p-4 rounded-2xl">
                  ✔ Saved builders loaded from Supabase
                </li>

                <li className="bg-white/10 p-4 rounded-2xl">
                  ✔ Dashboard synced successfully
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                My Orders
              </h2>

              <Link
                to="/marketplace"
                className="bg-orange-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-600 transition"
              >
                Buy Materials
              </Link>
            </div>

            {orders.length === 0 ? (
              <p className="text-gray-500">
                No orders found. Add materials to cart and place your first order.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border p-5 rounded-2xl hover:shadow-lg transition"
                  >
                    <div className="flex flex-wrap justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-xl">
                          Order #{order.id.slice(0, 8)}
                        </h3>

                        <p className="text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>

                        <p className="text-gray-500">
                          Status: {order.status}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-extrabold text-orange-500">
                          ₹{Number(order.total || 0).toLocaleString()}
                        </p>

                        <p className="text-gray-500">
                          {order.items?.length || 0} items
                        </p>
                      </div>
                    </div>

                    {order.items?.length > 0 && (
                      <div className="mt-4 grid md:grid-cols-3 gap-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 p-3 rounded-xl"
                          >
                            <p className="font-bold">
                              {item.name}
                            </p>

                            <p className="text-gray-500">
                              Qty: {item.quantity}
                            </p>

                            <p className="text-gray-500">
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
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                My Projects
              </h2>

              <Link
                to="/tracker"
                className="bg-orange-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-600 transition"
              >
                Manage Projects
              </Link>
            </div>

            {projects.length === 0 ? (
              <p className="text-gray-500">
                No projects found. Create one from the Project Tracker page.
              </p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="border p-5 rounded-2xl hover:shadow-lg transition"
                  >
                    <h3 className="font-bold text-xl">
                      {project.name}
                    </h3>

                    <p className="text-gray-500">
                      {project.type}
                    </p>

                    <p className="text-gray-500">
                      {project.location}
                    </p>

                    <p className="text-orange-500 font-bold mt-2">
                      ₹{Number(project.budget || 0).toLocaleString()}
                    </p>

                    <p className="text-gray-500 mt-2">
                      Progress: {getProjectProgress(project)}%
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Saved Builders
              </h2>

              <Link
                to="/builders"
                className="bg-orange-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-600 transition"
              >
                Find Builders
              </Link>
            </div>

            {savedBuilders.length === 0 ? (
              <p className="text-gray-500">
                No builders saved yet. Go to Builders page and click Save.
              </p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {savedBuilders.map((builder) => (
                  <div
                    key={builder.id}
                    className="border p-5 rounded-2xl hover:shadow-lg transition"
                  >
                    <h3 className="font-bold text-xl">
                      {builder.name}
                    </h3>

                    <p className="text-gray-500">
                      {builder.location}
                    </p>

                    <p className="text-orange-500 font-bold mt-2">
                      ⭐ {builder.rating}
                    </p>

                    <p className="text-gray-500">
                      {builder.specialty}
                    </p>

                    <p className="text-gray-500 mt-2">
                      📞 {builder.phone}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
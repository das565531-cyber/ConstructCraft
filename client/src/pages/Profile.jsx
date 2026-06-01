import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../services/supabase";
import { getUserOrders } from "../services/orderService";
import { getUserProjects } from "../services/projectService";
import { getSavedBuilders } from "../services/savedBuilderService";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [savedBuilders, setSavedBuilders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      const orderData = await getUserOrders();
      const projectData = await getUserProjects();
      const savedBuilderData = await getSavedBuilders();

      setOrders(orderData);
      setProjects(projectData);
      setSavedBuilders(savedBuilderData);
    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    }

    setLoading(false);
  };

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const totalSpent = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-6 pb-16 bg-slate-950 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-[radial-gradient(circle_at_top_left,#fb923c,transparent_25%),linear-gradient(135deg,#020617,#0f172a,#431407)] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-2xl mb-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-orange-300 font-bold uppercase tracking-widest">
                User Profile
              </p>

              <h1 className="text-5xl font-extrabold mt-3">
                {userName}
              </h1>

              <p className="text-gray-300 mt-3">
                {user?.email}
              </p>
            </div>

            <div className="bg-orange-500 text-white w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-xl">
              👤
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            ["Orders", orders.length, "📦"],
            ["Projects", projects.length, "📊"],
            ["Saved Builders", savedBuilders.length, "❤️"],
            ["Total Spent", `₹${totalSpent.toLocaleString()}`, "💰"],
          ].map(([title, value, icon]) => (
            <div
              key={title}
              className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl shadow-xl hover:-translate-y-2 transition"
            >
              <div className="text-4xl mb-3">{icon}</div>

              <p className="text-gray-300">{title}</p>

              <h2 className="text-4xl font-extrabold text-orange-400 mt-3">
                {value}
              </h2>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Recent Orders
              </h2>

              <Link
                to="/marketplace"
                className="text-orange-500 font-bold"
              >
                Shop More
              </Link>
            </div>

            {orders.length === 0 ? (
              <p className="text-gray-500">
                No orders yet.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 4).map((order) => (
                  <div
                    key={order.id}
                    className="border p-4 rounded-2xl flex justify-between"
                  >
                    <div>
                      <p className="font-bold">
                        Order #{order.id.slice(0, 8)}
                      </p>

                      <p className="text-gray-500 text-sm">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>

                      <p className="text-green-600 font-bold">
                        {order.status}
                      </p>
                    </div>

                    <p className="text-orange-500 font-extrabold text-xl">
                      ₹{Number(order.total || 0).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                My Projects
              </h2>

              <Link
                to="/tracker"
                className="text-orange-500 font-bold"
              >
                Manage
              </Link>
            </div>

            {projects.length === 0 ? (
              <p className="text-gray-500">
                No projects created yet.
              </p>
            ) : (
              <div className="space-y-4">
                {projects.slice(0, 4).map((project) => (
                  <div
                    key={project.id}
                    className="border p-4 rounded-2xl"
                  >
                    <h3 className="font-bold text-xl">
                      {project.name}
                    </h3>

                    <p className="text-gray-500">
                      {project.type} • {project.location}
                    </p>

                    <p className="text-orange-500 font-bold mt-2">
                      ₹{Number(project.budget || 0).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Saved Builders
            </h2>

            <Link
              to="/builders"
              className="bg-orange-500 text-white px-5 py-3 rounded-xl font-bold"
            >
              Find Builders
            </Link>
          </div>

          {savedBuilders.length === 0 ? (
            <p className="text-gray-500">
              No saved builders yet.
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
      </div>
    </div>
  );
}

export default Profile;
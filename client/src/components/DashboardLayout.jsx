import { NavLink } from "react-router-dom";

function DashboardLayout({ children }) {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏗️" },
    { name: "Orders", path: "/dashboard/orders", icon: "📦" },
    { name: "Admin Orders", path: "/dashboard/admin-orders", icon: "🛠️" },
    { name: "Profile", path: "/dashboard/profile", icon: "👤" },
    { name: "Builders", path: "/dashboard/builders", icon: "👷" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="hidden lg:flex w-72 bg-slate-950 text-white p-6 flex-col">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-orange-500">
            ConstructCraft
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Build smarter. Track better.
          </p>
        </div>

        <nav className="space-y-3 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="bg-white/10 rounded-3xl p-5">
          <p className="text-sm text-slate-300">Logged in as</p>
          <h3 className="font-bold text-lg">Souvik Das</h3>
        </div>
      </aside>

      <main className="flex-1">
        <header className="bg-white border-b border-slate-200 px-6 py-5 flex justify-between items-center sticky top-0 z-20">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Dashboard
            </h2>

            <p className="text-sm text-slate-500">
              Manage your construction workflow
            </p>
          </div>

          <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
            Souvik
          </div>
        </header>

        <div className="p-5 md:p-8">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
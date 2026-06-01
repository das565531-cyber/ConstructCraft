import { Link } from "react-router-dom";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      <div className="w-64 bg-black text-white p-5">

        <h1 className="text-2xl font-bold text-orange-500 mb-8">
          ConstructCraft
        </h1>

        <div className="space-y-4">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <br />

          <Link to="/dashboard/orders">
            Orders
          </Link>

          <br />

          <Link to="/dashboard/profile">
            Profile
          </Link>

          <br />

          <Link to="/dashboard/builders">
            Builders
          </Link>

        </div>

      </div>

      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}

export default DashboardLayout;
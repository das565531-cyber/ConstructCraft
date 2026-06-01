import { useEffect, useState } from "react";
import { getAdminStats, getRecentOrders } from "../services/adminService";
import {
  getProductsAdmin,
  addProduct,
  deleteProduct,
} from "../services/productAdminService";

function Admin() {
  const [stats, setStats] = useState({
    orders: 0,
    projects: 0,
    savedBuilders: 0,
    products: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    stock: "",
    unit: "",
    description: "",
  });

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const statsData = await getAdminStats();
      const ordersData = await getRecentOrders();
      const productsData = await getProductsAdmin();

      setStats(statsData);
      setRecentOrders(ordersData);
      setProducts(productsData);
    } catch (error) {
      console.log(error);
      alert("Failed to load admin data");
    }

    setLoading(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      await addProduct({
        name: form.name,
        price: Number(form.price),
        image: form.image,
        category: form.category,
        stock: Number(form.stock),
        unit: form.unit,
        description: form.description,
      });

      setForm({
        name: "",
        price: "",
        image: "",
        category: "",
        stock: "",
        unit: "",
        description: "",
      });

      await loadAdminData();

      alert("Product added successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      await loadAdminData();
      alert("Product deleted");
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-[radial-gradient(circle_at_top_left,#fb923c,transparent_25%),linear-gradient(135deg,#020617,#0f172a,#431407)] text-white">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] mb-10 shadow-2xl">
          <p className="text-orange-300 font-bold uppercase tracking-widest">
            Admin Control Panel
          </p>

          <h1 className="text-5xl font-extrabold mt-3">
            ConstructCraft Admin Dashboard
          </h1>

          <p className="text-gray-300 mt-4">
            Add products, manage marketplace materials, monitor orders and view Supabase data.
          </p>
        </div>

        {loading ? (
          <div className="bg-white/10 p-8 rounded-3xl border border-white/20">
            Loading admin data...
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              {[
                ["Orders", stats.orders, "📦"],
                ["Projects", stats.projects, "📊"],
                ["Saved Builders", stats.savedBuilders, "❤️"],
                ["Products", products.length, "🧱"],
              ].map(([title, value, icon]) => (
                <div
                  key={title}
                  className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl shadow-xl hover:-translate-y-2 transition"
                >
                  <div className="text-4xl mb-3">
                    {icon}
                  </div>

                  <p className="text-gray-300">
                    {title}
                  </p>

                  <h2 className="text-4xl font-extrabold text-orange-400 mt-3">
                    {value}
                  </h2>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-10">

              <div className="bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl">
                <h2 className="text-3xl font-extrabold mb-6">
                  Add New Product
                </h2>

                <form onSubmit={handleAddProduct}>
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full border p-4 rounded-xl mb-4"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Price"
                      className="w-full border p-4 rounded-xl mb-4"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      required
                    />

                    <input
                      type="number"
                      placeholder="Stock"
                      className="w-full border p-4 rounded-xl mb-4"
                      value={form.stock}
                      onChange={(e) =>
                        setForm({ ...form, stock: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Category"
                      className="w-full border p-4 rounded-xl mb-4"
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      required
                    />

                    <input
                      type="text"
                      placeholder="Unit example: per bag"
                      className="w-full border p-4 rounded-xl mb-4"
                      value={form.unit}
                      onChange={(e) =>
                        setForm({ ...form, unit: e.target.value })
                      }
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Image URL example: /materials/cement.jpg"
                    className="w-full border p-4 rounded-xl mb-4"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    required
                  />

                  <textarea
                    rows="4"
                    placeholder="Description"
                    className="w-full border p-4 rounded-xl mb-5"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition"
                  >
                    Add Product
                  </button>
                </form>
              </div>

              <div className="bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl">
                <h2 className="text-3xl font-extrabold mb-6">
                  Recent Orders
                </h2>

                {recentOrders.length === 0 ? (
                  <p className="text-gray-500">
                    No orders found yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border p-4 rounded-2xl flex justify-between items-center"
                      >
                        <div>
                          <p className="font-bold">
                            Order #{order.id.slice(0, 8)}
                          </p>

                          <p className="text-gray-500 text-sm">
                            {order.customer_email}
                          </p>

                          <p className="text-gray-500 text-sm">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-extrabold text-orange-500 text-xl">
                            ₹{Number(order.total || 0).toLocaleString()}
                          </p>

                          <p className="text-green-600 font-bold text-sm">
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl">
              <h2 className="text-3xl font-extrabold mb-6">
                Manage Products
              </h2>

              {products.length === 0 ? (
                <p className="text-gray-500">
                  No products found. Add your first product above.
                </p>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-44 w-full object-cover"
                      />

                      <div className="p-5">
                        <h3 className="font-bold text-xl">
                          {product.name}
                        </h3>

                        <p className="text-gray-500">
                          {product.category}
                        </p>

                        <p className="text-orange-500 text-2xl font-extrabold mt-2">
                          ₹{Number(product.price || 0).toLocaleString()}
                        </p>

                        <p className="text-gray-500">
                          Stock: {product.stock}
                        </p>

                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="w-full mt-4 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition"
                        >
                          Delete Product
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;
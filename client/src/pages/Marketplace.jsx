import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Marketplace() {
  const defaultProducts = [
    {
      id: 1,
      name: "UltraTech Cement",
      category: "Cement",
      price: 420,
      stock: 500,
      unit: "per bag",
      image: "/materials/cement.jpg",
    },
    {
      id: 2,
      name: "TMT Steel Rod",
      category: "Steel",
      price: 65000,
      stock: 120,
      unit: "per ton",
      image: "/materials/steel.jpg",
    },
    {
      id: 3,
      name: "Red Clay Bricks",
      category: "Bricks",
      price: 8,
      stock: 10000,
      unit: "per piece",
      image: "/materials/bricks.jpg",
    },
    {
      id: 4,
      name: "River Sand",
      category: "Sand",
      price: 2200,
      stock: 300,
      unit: "per load",
      image: "/materials/sand.jpg",
    },
    {
      id: 5,
      name: "Floor Tiles",
      category: "Tiles",
      price: 55,
      stock: 900,
      unit: "per sq ft",
      image: "/materials/tiles.jpg",
    },
    {
      id: 6,
      name: "Asian Paints",
      category: "Paint",
      price: 1250,
      stock: 140,
      unit: "per bucket",
      image: "/materials/paint.jpg",
    },
    {
      id: 7,
      name: "PVC Pipe",
      category: "Plumbing",
      price: 350,
      stock: 220,
      unit: "per piece",
      image: "/materials/pipe.jpg",
    },
    {
      id: 8,
      name: "Electrical Wire",
      category: "Electrical",
      price: 1800,
      stock: 180,
      unit: "per roll",
      image: "/materials/wire.jpg",
    },
    {
      id: 9,
      name: "Plywood Board",
      category: "Wood",
      price: 1450,
      stock: 90,
      unit: "per sheet",
      image: "/materials/plywood.jpg",
    },
    {
      id: 10,
      name: "Granite Slab",
      category: "Stone",
      price: 180,
      stock: 250,
      unit: "per sq ft",
      image: "/materials/granite.jpg",
    },
  ];

  const [products, setProducts] = useState(defaultProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/products");

      if (!res.ok) {
        throw new Error("Backend not available");
      }

      const data = await res.json();

      if (Array.isArray(data) && data.length >= 10) {
        setProducts(data);
      } else {
        setProducts(defaultProducts);
      }
    } catch (error) {
      console.log("Showing default products:", error.message);
      setProducts(defaultProducts);
    }

    setLoading(false);
  };

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filtered = products.filter((product) => {
    const productName = product.name || "";
    const productCategory = product.category || "";

    return (
      productName.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || productCategory === category)
    );
  });

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-[radial-gradient(circle_at_top_left,#fb923c,transparent_25%),linear-gradient(135deg,#020617,#0f172a,#431407)] text-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-orange-300 font-bold">
              🛒 Material Marketplace
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mt-6 leading-tight">
              Buy Real
              <span className="text-orange-400"> Construction Materials </span>
              Easily
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-8">
              Browse cement, steel, bricks, sand, tiles, paint, plumbing,
              electrical, wood and stone materials.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">
                  {products.length}
                </h2>
                <p className="text-gray-300">Products</p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">
                  {categories.length - 1}
                </h2>
                <p className="text-gray-300">Categories</p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">
                  Cart
                </h2>
                <p className="text-gray-300">Ready</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-orange-500/30 blur-3xl rounded-full"></div>

            <div className="relative bg-white/10 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-white/20">
              <h2 className="text-4xl font-extrabold mb-2">
                Search Materials
              </h2>

              <p className="text-gray-300 mb-6">
                Search cement, steel, bricks, sand, tiles, paint or pipes.
              </p>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Example: cement, bricks, steel, tiles..."
                className="w-full bg-white/90 text-slate-900 border border-white/30 p-4 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-orange-400">
                    {filtered.length}
                  </h3>
                  <p className="text-xs text-gray-300">Results</p>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-orange-400">
                    Fast
                  </h3>
                  <p className="text-xs text-gray-300">Order</p>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-orange-400">
                    Live
                  </h3>
                  <p className="text-xs text-gray-300">Rates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="bg-white/10 border border-white/20 p-5 rounded-3xl text-center mb-8">
            Checking backend products...
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 py-3 rounded-xl font-bold transition ${
                category === c
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-xl mt-8">
            <h2 className="text-2xl font-bold">
              No materials found
            </h2>

            <p className="text-gray-300 mt-2">
              Try searching cement, steel, bricks, sand, tiles or paint.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Marketplace;
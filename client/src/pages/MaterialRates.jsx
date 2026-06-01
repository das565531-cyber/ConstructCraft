import { useState } from "react";

function MaterialRates() {
  const [search, setSearch] = useState("");

  const rates = [
    {
      name: "UltraTech Cement",
      category: "Cement",
      price: "₹420 / bag",
      trend: "+4%",
      image:
        "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6",
    },
    {
      name: "TMT Steel Rod",
      category: "Steel",
      price: "₹65,000 / ton",
      trend: "+2%",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    },
    {
      name: "Red Clay Bricks",
      category: "Bricks",
      price: "₹8 / piece",
      trend: "-1%",
      image:
        "https://images.unsplash.com/photo-1599707254554-027aeb4deacd",
    },
    {
      name: "River Sand",
      category: "Sand",
      price: "₹2,200 / load",
      trend: "+3%",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
    },
    {
      name: "Floor Tiles",
      category: "Tiles",
      price: "₹55 / sq ft",
      trend: "+1%",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f",
    },
    {
      name: "Asian Paints",
      category: "Paint",
      price: "₹1,250 / bucket",
      trend: "+2%",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
    },
  ];

  const filteredRates = rates.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-[radial-gradient(circle_at_top_left,#fb923c,transparent_25%),linear-gradient(135deg,#020617,#0f172a,#431407)] text-white">

      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">

          <div>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-orange-300 font-bold">
              📈 Live Material Rates
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mt-6 leading-tight">
              Construction
              <span className="text-orange-400">
                {" "}Market Rates
              </span>
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-8">
              Track the latest construction material prices
              and market trends before placing your orders.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">

              <div className="bg-white/10 backdrop-blur border border-white/10 p-5 rounded-3xl">
                <h2 className="text-3xl font-bold text-orange-400">
                  6+
                </h2>
                <p className="text-gray-300">
                  Materials
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur border border-white/10 p-5 rounded-3xl">
                <h2 className="text-3xl font-bold text-orange-400">
                  Live
                </h2>
                <p className="text-gray-300">
                  Updates
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur border border-white/10 p-5 rounded-3xl">
                <h2 className="text-3xl font-bold text-orange-400">
                  Kolkata
                </h2>
                <p className="text-gray-300">
                  Market
                </p>
              </div>

            </div>

          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem]">

            <h2 className="text-3xl font-bold mb-4">
              Search Material
            </h2>

            <p className="text-gray-300 mb-5">
              Find current rates instantly
            </p>

            <input
              type="text"
              placeholder="Search cement, steel, bricks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                bg-white/90
                text-black
                p-4
                rounded-xl
                border
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

          </div>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredRates.map((item, index) => (

            <div
              key={index}
              className="
                bg-white/10
                backdrop-blur-xl
                rounded-[2rem]
                overflow-hidden
                border
                border-white/10
                hover:-translate-y-2
                transition
              "
            >

              <div className="relative">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-60 w-full object-cover"
                />

                <div className="absolute top-4 left-4 bg-orange-500 px-4 py-2 rounded-full font-bold">
                  {item.category}
                </div>

                <div className="absolute top-4 right-4 bg-green-500 px-4 py-2 rounded-full font-bold">
                  {item.trend}
                </div>

              </div>

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="text-orange-400 text-4xl font-extrabold mt-4">
                  {item.price}
                </p>

                <button
                  className="
                    w-full
                    mt-6
                    bg-orange-500
                    py-3
                    rounded-xl
                    font-bold
                    hover:bg-orange-600
                    transition
                  "
                >
                  View Market Trend
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default MaterialRates;
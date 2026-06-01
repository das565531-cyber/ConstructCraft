import { useState } from "react";

function Calculator() {
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState(1);
  const [quality, setQuality] = useState("standard");
  const [type, setType] = useState("house");
  const [location, setLocation] = useState("Kolkata");
  const [result, setResult] = useState(null);

  const calculateCost = () => {
    const builtArea = Number(area) * Number(floors);

    if (!builtArea || builtArea <= 0) {
      alert("Enter valid area and floors");
      return;
    }

    let rate = 2200;

    if (quality === "economy") rate = 1600;
    if (quality === "standard") rate = 2200;
    if (quality === "premium") rate = 3200;
    if (quality === "luxury") rate = 4500;

    if (type === "apartment") rate += 250;
    if (type === "commercial") rate += 600;
    if (type === "villa") rate += 850;

    const total = builtArea * rate;

    setResult({
      builtArea,
      rate,
      total,
      material: Math.round(total * 0.55),
      labour: Math.round(total * 0.28),
      finishing: Math.round(total * 0.12),
      misc: Math.round(total * 0.05),
      cement: Math.round(builtArea * 0.4),
      steel: Math.round(builtArea * 4),
      bricks: Math.round(builtArea * 8),
      sand: Math.round(builtArea * 1.2),
      tiles: Math.round(builtArea * 0.85),
      paint: Math.round(builtArea * 0.06),
    });
  };

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-[radial-gradient(circle_at_top_left,#fb923c,transparent_28%),linear-gradient(135deg,#020617,#0f172a,#431407)] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-orange-300 font-bold">
              🏗️ Smart Construction Estimator
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mt-6 leading-tight">
              Plan Your
              <span className="text-orange-400"> Construction Budget </span>
              Smarter
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-8">
              Generate a stylish cost estimate with material split,
              labour budget, finishing cost, and construction quantity
              breakdown for your project.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">
                  4
                </h2>
                <p className="text-gray-300">
                  Quality Modes
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">
                  10+
                </h2>
                <p className="text-gray-300">
                  Material Metrics
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">
                  Live
                </h2>
                <p className="text-gray-300">
                  Instant Result
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white/10 border border-white/10 rounded-3xl p-5 backdrop-blur">
              <p className="text-sm text-gray-300">
                Example: 1200 sq ft × 2 floors × Premium quality gives
                complete budget, cement, steel, bricks, sand, paint and tiles.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-orange-500/30 blur-3xl rounded-full"></div>

            <div className="relative bg-white/10 backdrop-blur-2xl text-white p-8 rounded-[2rem] shadow-2xl border border-white/20">

              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-orange-500/10 rounded-[2rem]"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h2 className="text-4xl font-extrabold">
                      Project Details
                    </h2>

                    <p className="text-gray-300 mt-1">
                      Enter your construction details
                    </p>
                  </div>

                  <div className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    Estimate
                  </div>
                </div>

                <label className="font-bold text-sm text-orange-300">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/90 text-slate-900 border border-white/30 p-4 rounded-xl mb-4 mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <label className="font-bold text-sm text-orange-300">
                  Built-up Area
                </label>

                <input
                  type="number"
                  placeholder="Example: 1200"
                  className="w-full bg-white/90 text-slate-900 border border-white/30 p-4 rounded-xl mb-4 mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />

                <label className="font-bold text-sm text-orange-300">
                  Number of Floors
                </label>

                <input
                  type="number"
                  className="w-full bg-white/90 text-slate-900 border border-white/30 p-4 rounded-xl mb-4 mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={floors}
                  onChange={(e) => setFloors(e.target.value)}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-sm text-orange-300">
                      Quality
                    </label>

                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full bg-white/90 text-slate-900 border border-white/30 p-4 rounded-xl mb-4 mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="economy">Economy</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-sm text-orange-300">
                      Project Type
                    </label>

                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-white/90 text-slate-900 border border-white/30 p-4 rounded-xl mb-4 mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculateCost}
                  className="w-full mt-2 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-4 rounded-xl font-extrabold hover:scale-[1.02] transition shadow-2xl"
                >
                  Generate Smart Estimate
                </button>

                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                    <h3 className="text-2xl font-bold text-orange-400">
                      ₹1600+
                    </h3>
                    <p className="text-xs text-gray-300">
                      per sq ft
                    </p>
                  </div>

                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                    <h3 className="text-2xl font-bold text-orange-400">
                      6+
                    </h3>
                    <p className="text-xs text-gray-300">
                      materials
                    </p>
                  </div>

                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                    <h3 className="text-2xl font-bold text-orange-400">
                      Instant
                    </h3>
                    <p className="text-xs text-gray-300">
                      estimate
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {result && (
          <div className="mt-16">

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl">
                <p className="text-gray-500">
                  Estimated Total Cost
                </p>

                <h2 className="text-6xl font-extrabold text-orange-500 mt-3">
                  ₹{result.total.toLocaleString()}
                </h2>

                <div className="grid md:grid-cols-3 gap-5 mt-8">
                  <div className="bg-orange-50 p-5 rounded-2xl">
                    <p className="text-gray-500">
                      Built Area
                    </p>
                    <h3 className="text-2xl font-bold">
                      {result.builtArea.toLocaleString()} sq ft
                    </h3>
                  </div>

                  <div className="bg-orange-50 p-5 rounded-2xl">
                    <p className="text-gray-500">
                      Rate
                    </p>
                    <h3 className="text-2xl font-bold">
                      ₹{result.rate}/sq ft
                    </h3>
                  </div>

                  <div className="bg-orange-50 p-5 rounded-2xl">
                    <p className="text-gray-500">
                      Location
                    </p>
                    <h3 className="text-2xl font-bold">
                      {location}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500 text-white p-8 rounded-[2rem] shadow-2xl">
                <h3 className="text-2xl font-bold mb-5">
                  Budget Split
                </h3>

                <div className="space-y-4">
                  <p>
                    Material: ₹{result.material.toLocaleString()}
                  </p>
                  <p>
                    Labour: ₹{result.labour.toLocaleString()}
                  </p>
                  <p>
                    Finishing: ₹{result.finishing.toLocaleString()}
                  </p>
                  <p>
                    Misc: ₹{result.misc.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">
              {[
                ["Cement", `${result.cement} Bags`, "🧱"],
                ["Steel", `${result.steel} Kg`, "🏗️"],
                ["Bricks", `${result.bricks} Pieces`, "🧱"],
                ["Sand", `${result.sand} Cu ft`, "⛱️"],
                ["Tiles", `${result.tiles} sq ft`, "⬜"],
                ["Paint", `${result.paint} Litres`, "🎨"],
              ].map(([title, value, icon]) => (
                <div
                  className="bg-white text-slate-900 p-6 rounded-3xl shadow-xl hover:-translate-y-2 transition"
                  key={title}
                >
                  <div className="text-4xl mb-3">
                    {icon}
                  </div>
                  <p className="text-gray-500">
                    {title}
                  </p>
                  <h3 className="text-xl font-extrabold text-orange-500 mt-2">
                    {value}
                  </h3>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Calculator;
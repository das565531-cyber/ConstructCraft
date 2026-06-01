import { useEffect, useState } from "react";
import { getBuilders } from "../services/builderService";
import {
  getSavedBuilders,
  saveBuilder,
  removeSavedBuilder,
} from "../services/savedBuilderService";

function Builders() {
  const [search, setSearch] = useState("");
  const [builders, setBuilders] = useState([]);
  const [savedBuilders, setSavedBuilders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBuilders();
    loadSavedBuilders();
  }, []);

  const loadBuilders = async () => {
    try {
      const data = await getBuilders();
      setBuilders(data || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load builders");
    }

    setLoading(false);
  };

  const loadSavedBuilders = async () => {
    try {
      const data = await getSavedBuilders();
      setSavedBuilders(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const isSaved = (id) =>
    savedBuilders.some((item) => item.builder_id === id);

  const handleSaveBuilder = async (builder) => {
    try {
      if (isSaved(builder.id)) {
        await removeSavedBuilder(builder.id);
      } else {
        await saveBuilder(builder);
      }

      await loadSavedBuilders();
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredBuilders = builders.filter(
    (builder) =>
      builder.location?.toLowerCase().includes(search.toLowerCase()) ||
      builder.name?.toLowerCase().includes(search.toLowerCase()) ||
      builder.specialty?.toLowerCase().includes(search.toLowerCase())
  );

  const avgRating =
    builders.length > 0
      ? (
          builders.reduce(
            (sum, builder) => sum + Number(builder.rating || 0),
            0
          ) / builders.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-[radial-gradient(circle_at_top_left,#fb923c,transparent_25%),linear-gradient(135deg,#020617,#0f172a,#431407)] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-orange-300 font-bold">
              🏗️ Verified Professionals
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mt-6 leading-tight">
              Find Trusted
              <span className="text-orange-400"> Builders </span>
              Near You
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-8">
              Builders are now loaded dynamically from Supabase. Save your
              favorite builders securely and view them from your dashboard.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl">
                <h2 className="text-3xl font-bold text-orange-400">
                  {builders.length}
                </h2>
                <p className="text-gray-300">Builders</p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl">
                <h2 className="text-3xl font-bold text-orange-400">
                  {avgRating}
                </h2>
                <p className="text-gray-300">Avg Rating</p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl">
                <h2 className="text-3xl font-bold text-orange-400">
                  {savedBuilders.length}
                </h2>
                <p className="text-gray-300">Saved</p>
              </div>
            </div>
          </div>

          <div className="relative bg-white/10 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-white/20">
            <h2 className="text-4xl font-extrabold mb-2">
              Search Builders
            </h2>

            <p className="text-gray-300 mb-6">
              Search by location, company name or specialty.
            </p>

            <input
              type="text"
              placeholder="Example: Kolkata, Howrah, Residential..."
              className="w-full bg-white/90 text-slate-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                <h3 className="text-2xl font-bold text-orange-400">
                  {filteredBuilders.length}
                </h3>
                <p className="text-xs text-gray-300">
                  Results
                </p>
              </div>

              <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                <h3 className="text-2xl font-bold text-orange-400">
                  Live
                </h3>
                <p className="text-xs text-gray-300">
                  Supabase
                </p>
              </div>

              <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                <h3 className="text-2xl font-bold text-orange-400">
                  Fast
                </h3>
                <p className="text-xs text-gray-300">
                  Contact
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center bg-white/10 border border-white/20 p-10 rounded-3xl">
            Loading builders from Supabase...
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {filteredBuilders.map((builder) => (
                <div
                  key={builder.id}
                  className="bg-white/10 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl hover:-translate-y-3 transition border border-white/20"
                >
                  <div className="relative">
                    <img
                      src={builder.image}
                      alt={builder.name}
                      className="h-72 w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                      ⭐ {builder.rating}
                    </div>

                    <button
                      onClick={() => handleSaveBuilder(builder)}
                      className={`absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-sm transition ${
                        isSaved(builder.id)
                          ? "bg-red-500 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {isSaved(builder.id) ? "❤️ Saved" : "🤍 Save"}
                    </button>

                    <div className="absolute bottom-5 left-5">
                      <h2 className="text-2xl font-extrabold">
                        {builder.name}
                      </h2>

                      <p className="text-gray-300">
                        {builder.projects}+ Projects
                      </p>
                    </div>
                  </div>

                  <div className="p-7">
                    <p className="text-gray-300">
                      Owner: <b className="text-white">{builder.owner}</b>
                    </p>

                    <div className="mt-5 space-y-3 text-gray-300">
                      <p>
                        🏗️ Specialty:{" "}
                        <b className="text-white">{builder.specialty}</b>
                      </p>

                      <p>
                        📍 Location:{" "}
                        <b className="text-white">{builder.location}</b>
                      </p>

                      <p>
                        ⏳ Experience:{" "}
                        <b className="text-white">{builder.experience} Years</b>
                      </p>

                      <p>
                        📞 Contact:{" "}
                        <b className="text-white">{builder.phone}</b>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-7">
                      <button className="bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition">
                        Contact
                      </button>

                      <button className="border border-white/40 text-white py-3 rounded-xl font-bold hover:bg-white hover:text-black transition">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBuilders.length === 0 && (
              <div className="text-center bg-white/10 border border-white/20 p-10 rounded-3xl mt-8">
                <h2 className="text-2xl font-bold">
                  No builders found
                </h2>

                <p className="text-gray-300 mt-2">
                  Add builders in Supabase or try another search.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Builders;
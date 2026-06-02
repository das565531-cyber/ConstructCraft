import { useEffect, useState } from "react";

function Builders() {
  const [search, setSearch] = useState("");
  const [savedBuilders, setSavedBuilders] = useState([]);

  const fallbackImage =
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80";

  const builders = [
    {
      id: 1,
      name: "Roy Construction",
      owner: "Arindam Roy",
      rating: 4.8,
      experience: 15,
      location: "Kolkata",
      projects: 120,
      phone: "+919876543210",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",
      specialty: "Residential Projects",
      verified: true,
    },
    {
      id: 2,
      name: "Bengal Builders",
      owner: "Subham Ghosh",
      rating: 4.6,
      experience: 10,
      location: "Howrah",
      projects: 95,
      phone: "+919123456789",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
      specialty: "Commercial Projects",
      verified: true,
    },
    {
      id: 3,
      name: "Elite Construction",
      owner: "Rahul Sen",
      rating: 4.9,
      experience: 18,
      location: "Salt Lake",
      projects: 160,
      phone: "+919988776655",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
      specialty: "Premium Homes",
      verified: true,
    },
  ];

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("savedBuilders")) || [];

    setSavedBuilders(saved);
  }, []);

  const saveBuilder = (builder) => {
    const alreadySaved = savedBuilders.some(
      (item) => item.id === builder.id
    );

    let updated;

    if (alreadySaved) {
      updated = savedBuilders.filter(
        (item) => item.id !== builder.id
      );
    } else {
      updated = [...savedBuilders, builder];
    }

    setSavedBuilders(updated);
    localStorage.setItem("savedBuilders", JSON.stringify(updated));
  };

  const isSaved = (id) =>
    savedBuilders.some((item) => item.id === id);

  const filteredBuilders = builders.filter(
    (builder) =>
      builder.location.toLowerCase().includes(search.toLowerCase()) ||
      builder.name.toLowerCase().includes(search.toLowerCase()) ||
      builder.specialty.toLowerCase().includes(search.toLowerCase())
  );

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
              Compare ratings, experience, project history, specialties and
              contact trusted builders for your construction work.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">250+</h2>
                <p className="text-gray-300">Builders</p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">4.8</h2>
                <p className="text-gray-300">Avg Rating</p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">
                  {savedBuilders.length}
                </h2>
                <p className="text-gray-300">Saved</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-orange-500/30 blur-3xl rounded-full"></div>

            <div className="relative bg-white/10 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-orange-500/10 rounded-[2rem]"></div>

              <div className="relative z-10">
                <h2 className="text-4xl font-extrabold mb-2">
                  Search Builders
                </h2>

                <p className="text-gray-300 mb-6">
                  Find builders by location, company name or project type.
                </p>

                <label className="font-bold text-sm text-orange-300">
                  Search
                </label>

                <input
                  type="text"
                  placeholder="Example: Kolkata, Howrah, Residential..."
                  className="w-full bg-white/90 text-slate-900 border border-white/30 p-4 rounded-xl mb-6 mt-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                    <h3 className="text-2xl font-bold text-orange-400">
                      {filteredBuilders.length}
                    </h3>
                    <p className="text-xs text-gray-300">Results</p>
                  </div>

                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                    <h3 className="text-2xl font-bold text-orange-400">
                      100%
                    </h3>
                    <p className="text-xs text-gray-300">Verified</p>
                  </div>

                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
                    <h3 className="text-2xl font-bold text-orange-400">
                      Fast
                    </h3>
                    <p className="text-xs text-gray-300">Contact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                  className="h-72 w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow">
                  ⭐ {builder.rating}
                </div>

                <button
                  onClick={() => saveBuilder(builder)}
                  className={`absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-sm shadow transition ${
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
                  <a
                    href={`tel:${builder.phone}`}
                    className="bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition text-center"
                  >
                    Contact
                  </a>

                  <button className="border border-white/40 text-white py-3 rounded-xl font-bold hover:bg-white hover:text-black transition">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBuilders.length === 0 && (
          <div className="text-center bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-xl mt-8">
            <h2 className="text-2xl font-bold">
              No builders found
            </h2>

            <p className="text-gray-300 mt-2">
              Try searching Kolkata, Howrah, Salt Lake, Residential, or Commercial.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Builders;
function About() {
  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-gradient-to-br from-orange-50 via-white to-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-950 text-white p-10 rounded-[2rem] mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f97316,transparent_30%)] opacity-60"></div>

          <div className="relative z-10">
            <p className="text-orange-500 font-bold uppercase tracking-widest">
              About Us
            </p>

            <h1 className="text-6xl font-extrabold mt-3">
              ConstructCraft
            </h1>

            <p className="mt-5 text-gray-300 leading-8 max-w-4xl">
              ConstructCraft is a smart construction management platform
              designed to help users estimate project costs, discover trusted
              builders, purchase construction materials, track project progress,
              generate invoices, and get AI-powered construction guidance from
              one unified platform.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold text-orange-500 mb-3">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-7">
              To simplify construction planning by connecting users with
              builders, materials, estimates, and project tools in a single
              digital platform.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold text-orange-500 mb-3">
              Our Vision
            </h2>

            <p className="text-gray-600 leading-7">
              To become a reliable construction-tech solution for homeowners,
              students, builders, and project managers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold text-orange-500 mb-3">
              Project Goal
            </h2>

            <p className="text-gray-600 leading-7">
              Build a practical minor project with real-world features like
              cost estimation, marketplace, cart, dashboard, AI, and tracking.
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-extrabold mb-8">
          Team Members
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Souvik Das",
            "Team Member 2",
            "Team Member 3",
            "Team Member 4",
          ].map((member) => (
            <div
              key={member}
              className="bg-white p-8 rounded-3xl shadow-xl text-center hover:-translate-y-2 transition"
            >
              <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                👤
              </div>

              <h3 className="font-bold text-xl">
                {member}
              </h3>

              <p className="text-gray-500 mt-2">
                ConstructCraft Team
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
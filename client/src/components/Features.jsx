function Features() {
  const features = [
    {
      title: "Smart Cost Calculator",
      text: "Estimate budget, material cost, labour cost, finishing cost and material quantities.",
      icon: "📊",
    },
    {
      title: "Verified Builders",
      text: "Find trusted builders with ratings, experience, location and project history.",
      icon: "🏗️",
    },
    {
      title: "Material Marketplace",
      text: "Buy cement, steel, bricks, sand, tiles, paint, plumbing and electrical items.",
      icon: "🛒",
    },
    {
      title: "Live Material Rates",
      text: "Track Kolkata-based material rates with simulated live update status.",
      icon: "📈",
    },
    {
      title: "AI Construction Assistant",
      text: "Get help with cement, steel, foundation, roofing, waterproofing and planning.",
      icon: "🤖",
    },
    {
      title: "Project Tracking",
      text: "Monitor construction milestones from planning to finishing with status badges.",
      icon: "✅",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-orange-50 to-slate-100 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-orange-500 font-bold text-center uppercase tracking-widest">
          Platform Features
        </p>

        <h2 className="text-5xl font-extrabold text-center mt-3 mb-14">
          Everything For Construction Management
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-3 hover:shadow-2xl transition border border-orange-100"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
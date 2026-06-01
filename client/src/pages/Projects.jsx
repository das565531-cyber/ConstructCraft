function Projects() {
  const projects = [
    {
      name: "Luxury Villa",
      location: "New Town, Kolkata",
      budget: "₹45 Lakhs",
    },
    {
      name: "Apartment Complex",
      location: "Salt Lake",
      budget: "₹2.5 Crore",
    },
    {
      name: "Commercial Building",
      location: "Howrah",
      budget: "₹1.2 Crore",
    },
  ];

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Featured Projects
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold">
              {project.name}
            </h2>

            <p>{project.location}</p>

            <p className="text-orange-500 font-bold">
              {project.budget}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
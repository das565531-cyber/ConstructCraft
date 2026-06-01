import { useEffect, useState } from "react";
import {
  createProject,
  getUserProjects,
  updateProjectStages,
} from "../services/projectService";

function ProjectTracker() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    type: "Residential House",
    location: "Kolkata",
    budget: "",
    builder: "",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getUserProjects();
      setProjects(data);

      if (data.length > 0) {
        setSelectedProject(data[0]);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load projects");
    }

    setLoading(false);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    const newProject = {
      ...form,
      stages: [
        {
          name: "Planning & Design",
          status: "Completed",
          week: "Week 1",
        },
        {
          name: "Foundation Work",
          status: "In Progress",
          week: "Week 2",
        },
        {
          name: "Structure Work",
          status: "Pending",
          week: "Week 4",
        },
        {
          name: "Electrical & Plumbing",
          status: "Pending",
          week: "Week 7",
        },
        {
          name: "Painting & Finishing",
          status: "Pending",
          week: "Week 10",
        },
      ],
    };

    try {
      await createProject(newProject);

      setForm({
        name: "",
        type: "Residential House",
        location: "Kolkata",
        budget: "",
        builder: "",
      });

      await loadProjects();

      alert("Project created successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to create project");
    }
  };

  const updateStage = async (index, status) => {
    const updatedStages = selectedProject.stages.map((stage, i) =>
      i === index ? { ...stage, status } : stage
    );

    const updatedProject = {
      ...selectedProject,
      stages: updatedStages,
    };

    setSelectedProject(updatedProject);

    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProject.id ? updatedProject : project
      )
    );

    try {
      await updateProjectStages(selectedProject.id, updatedStages);
    } catch (error) {
      console.log(error);
      alert("Failed to update stage");
    }
  };

  const completedCount =
    selectedProject?.stages?.filter(
      (stage) => stage.status === "Completed"
    ).length || 0;

  const progress = selectedProject
    ? Math.round(
        (completedCount / selectedProject.stages.length) * 100
      )
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-6 pb-16 bg-slate-950 text-white">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-[radial-gradient(circle_at_top_left,#fb923c,transparent_25%),linear-gradient(135deg,#020617,#0f172a,#431407)] text-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-orange-300 font-bold">
              📊 User Project Tracker
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mt-6 leading-tight">
              Track Your
              <span className="text-orange-400">
                {" "}Construction Progress{" "}
              </span>
              Live
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-8">
              Create your own project, assign builder details, update progress
              stages, and save everything permanently in Supabase.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">
                  {projects.length}
                </h2>
                <p className="text-gray-300">
                  Projects
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">
                  5
                </h2>
                <p className="text-gray-300">
                  Stages
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 p-5 rounded-3xl backdrop-blur">
                <h2 className="text-3xl font-bold text-orange-400">
                  {progress}%
                </h2>
                <p className="text-gray-300">
                  Progress
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-orange-500/30 blur-3xl rounded-full"></div>

            <div className="relative bg-white/10 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-white/20">
              <h2 className="text-4xl font-extrabold mb-3">
                Create Project
              </h2>

              <p className="text-gray-300 mb-6">
                Add your own project details to start tracking.
              </p>

              <form onSubmit={handleCreateProject}>
                <input
                  type="text"
                  placeholder="Project Name"
                  className="w-full bg-white/90 text-slate-900 p-4 rounded-xl mb-4"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />

                <select
                  className="w-full bg-white/90 text-slate-900 p-4 rounded-xl mb-4"
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value })
                  }
                >
                  <option>Residential House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Commercial Building</option>
                  <option>Office Interior</option>
                </select>

                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-white/90 text-slate-900 p-4 rounded-xl mb-4"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Budget"
                  className="w-full bg-white/90 text-slate-900 p-4 rounded-xl mb-4"
                  value={form.budget}
                  onChange={(e) =>
                    setForm({ ...form, budget: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Builder Name"
                  className="w-full bg-white/90 text-slate-900 p-4 rounded-xl mb-5"
                  value={form.builder}
                  onChange={(e) =>
                    setForm({ ...form, builder: e.target.value })
                  }
                />

                <button
                  type="submit"
                  className="w-full bg-orange-500 py-4 rounded-xl font-bold hover:bg-orange-600 transition"
                >
                  Create & Save Project
                </button>
              </form>
            </div>
          </div>
        </div>

        {projects.length > 0 && (
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-5 rounded-[2rem] mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Your Projects
            </h2>

            <div className="flex flex-wrap gap-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`px-5 py-3 rounded-xl font-bold transition ${
                    selectedProject?.id === project.id
                      ? "bg-orange-500 text-white"
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {!selectedProject ? (
          <div className="text-center bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[2rem] shadow-2xl">
            <h2 className="text-3xl font-bold">
              No project created yet
            </h2>

            <p className="text-gray-300 mt-3">
              Fill the project form above to create your own tracking dashboard.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-2xl">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-extrabold">
                    {selectedProject.name}
                  </h2>

                  <p className="text-gray-300">
                    {selectedProject.type} • {selectedProject.location}
                  </p>
                </div>

                <span className="bg-orange-500 px-5 py-3 rounded-full font-bold">
                  {progress}% Complete
                </span>
              </div>

              <div className="bg-black/40 h-5 rounded-full mb-8">
                <div
                  className="bg-orange-500 h-5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="space-y-5">
                {selectedProject.stages.map((stage, index) => (
                  <div
                    key={index}
                    className="bg-black/30 border border-white/10 p-5 rounded-2xl"
                  >
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <h3 className="font-bold text-xl">
                          {stage.name}
                        </h3>

                        <p className="text-gray-400">
                          {stage.week}
                        </p>
                      </div>

                      <select
                        value={stage.status}
                        onChange={(e) =>
                          updateStage(index, e.target.value)
                        }
                        className="bg-white text-slate-900 p-3 rounded-xl font-bold"
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </div>

                    <div
                      className={`mt-4 inline-block px-4 py-2 rounded-full font-bold ${
                        stage.status === "Completed"
                          ? "bg-green-500"
                          : stage.status === "In Progress"
                          ? "bg-orange-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {stage.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl h-fit">
              <h2 className="text-3xl font-extrabold mb-6">
                Project Summary
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-gray-500">
                    Project Type
                  </p>
                  <h3 className="font-bold text-xl">
                    {selectedProject.type}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Location
                  </p>
                  <h3 className="font-bold text-xl">
                    {selectedProject.location}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Budget
                  </p>
                  <h3 className="font-bold text-xl">
                    ₹{Number(selectedProject.budget || 0).toLocaleString()}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Builder
                  </p>
                  <h3 className="font-bold text-xl">
                    {selectedProject.builder || "Not Assigned"}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Completed Stages
                  </p>
                  <h3 className="font-bold text-xl">
                    {completedCount} / {selectedProject.stages.length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProjectTracker;
import supabase from "./supabase";

export const createProject = async (project) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        user_id: user.id,
        name: project.name,
        type: project.type,
        location: project.location,
        budget: project.budget,
        builder: project.builder,
        stages: project.stages,
      },
    ])
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserProjects = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const updateProjectStages = async (projectId, stages) => {
  const { data, error } = await supabase
    .from("projects")
    .update({ stages })
    .eq("id", projectId)
    .select();

  if (error) {
    throw error;
  }

  return data;
};
import supabase from "./supabase";

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};
export const deleteProject = async (projectId) => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    throw error;
  }
};
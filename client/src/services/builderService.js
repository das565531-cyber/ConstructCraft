import supabase from "./supabase";

export const getBuilders = async () => {
  const { data, error } = await supabase
    .from("builders")
    .select("*")
    .order("rating", { ascending: false });

  if (error) throw error;

  return data;
};
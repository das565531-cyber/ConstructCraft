import supabase from "./supabase";

export const getProductsAdmin = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const addProduct = async (product) => {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select();

  if (error) throw error;
  return data;
};

export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
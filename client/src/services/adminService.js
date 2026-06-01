import supabase from "./supabase";

export const getAdminStats = async () => {
  const { count: orders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { count: projects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const { count: savedBuilders } = await supabase
    .from("saved_builders")
    .select("*", { count: "exact", head: true });

  const { count: products } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  return {
    orders: orders || 0,
    projects: projects || 0,
    savedBuilders: savedBuilders || 0,
    products: products || 0,
  };
};

export const getRecentOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  return data;
};
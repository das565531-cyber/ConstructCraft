import supabase from "./supabase";

export const getDashboardStats = async () => {

  const { count: orderCount } =
    await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

  const { count: builderCount } =
    await supabase
      .from("builders")
      .select("*", { count: "exact", head: true });

  const { count: productCount } =
    await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

  return {
    orderCount: orderCount || 0,
    builderCount: builderCount || 0,
    productCount: productCount || 0,
  };
};
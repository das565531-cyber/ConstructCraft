import supabase from "./supabase";

export const createOrder = async (total, items) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first");
  }

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: user.id,
        customer_email: user.email,
        total,
        items,
        status: "Placed",
      },
    ])
    .select();

  if (error) throw error;

  return data;
};

export const getUserOrders = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};
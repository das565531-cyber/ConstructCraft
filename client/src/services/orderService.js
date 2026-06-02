import supabase from "./supabase";

export const createOrder = async (orderData) => {
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
        user_email: user.email,
        total_amount: orderData.total,
        items: orderData.items,
        delivery: orderData.delivery,
        payment_method: orderData.payment_method,
        payment_status: orderData.payment_status,
        status: orderData.status || "Placed",
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

  return data || [];
};

export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select();

  if (error) throw error;

  return data;
};
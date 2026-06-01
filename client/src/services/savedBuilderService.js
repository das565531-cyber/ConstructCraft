import supabase from "./supabase";

export const getSavedBuilders = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("saved_builders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const saveBuilder = async (builder) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first");
  }

  const { data, error } = await supabase
    .from("saved_builders")
    .insert([
      {
        user_id: user.id,
        builder_id: builder.id,
        name: builder.name,
        owner: builder.owner,
        rating: builder.rating,
        experience: builder.experience,
        location: builder.location,
        projects: builder.projects,
        phone: builder.phone,
        image: builder.image,
        specialty: builder.specialty,
      },
    ])
    .select();

  if (error) throw error;

  return data;
};

export const removeSavedBuilder = async (builderId) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first");
  }

  const { error } = await supabase
    .from("saved_builders")
    .delete()
    .eq("user_id", user.id)
    .eq("builder_id", builderId);

  if (error) throw error;
};
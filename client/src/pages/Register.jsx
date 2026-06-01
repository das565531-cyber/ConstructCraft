import { useState } from "react";
import supabase from "../services/supabase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Registration Successful!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={registerUser}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4">
          Register
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-orange-500 text-white px-4 py-2 w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";

function Login() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: {
          full_name: fullName,
        },
        shouldCreateUser: true,
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setStep("otp");
    alert("OTP sent to your email");
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login successful");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-[radial-gradient(circle_at_top_left,#fb923c,transparent_25%),linear-gradient(135deg,#020617,#0f172a,#431407)] text-white">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-3xl mb-4">
            🔐
          </div>

          <h1 className="text-4xl font-extrabold">
            User Login
          </h1>

          <p className="text-gray-300 mt-3">
            Login securely using email OTP.
          </p>
        </div>

        {step === "email" ? (
          <form onSubmit={sendOtp}>
            <label className="font-bold text-sm text-orange-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-white/90 text-black p-4 rounded-xl mb-4 mt-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <label className="font-bold text-sm text-orange-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white/90 text-black p-4 rounded-xl mb-5 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 py-4 rounded-xl font-bold hover:bg-orange-600 transition"
            >
              {loading ? "Sending OTP..." : "Send Email OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">
                📧
              </div>

              <h2 className="text-2xl font-bold text-orange-400">
                Enter OTP
              </h2>

              <p className="text-gray-300 mt-3">
                We sent a 6-digit OTP to:
              </p>

              <p className="font-bold mt-2">
                {email}
              </p>
            </div>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="w-full bg-white/90 text-black p-4 rounded-xl mb-5 text-center text-2xl tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 py-4 rounded-xl font-bold hover:bg-green-700 transition"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full mt-4 border border-white/30 py-3 rounded-xl font-bold hover:bg-white hover:text-black transition"
            >
              Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
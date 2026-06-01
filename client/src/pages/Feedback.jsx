import { useState } from "react";

function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-gradient-to-br from-orange-50 via-white to-slate-100">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-orange-500 font-bold uppercase tracking-widest">
            User Feedback
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-3">
            Share Your Experience
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Your feedback helps us improve ConstructCraft and build better
            tools for construction planning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          <div className="bg-slate-950 text-white p-8 rounded-[2rem] shadow-xl">
            <h2 className="text-3xl font-bold mb-6">
              What Users Like
            </h2>

            <div className="space-y-5">
              <div className="bg-white/10 p-5 rounded-2xl">
                <h3 className="font-bold text-orange-400">
                  Smart Calculator
                </h3>
                <p className="text-gray-300 mt-2">
                  Fast construction cost estimation with material breakdown.
                </p>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl">
                <h3 className="font-bold text-orange-400">
                  Builder Discovery
                </h3>
                <p className="text-gray-300 mt-2">
                  Easy comparison of trusted builders and project experience.
                </p>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl">
                <h3 className="font-bold text-orange-400">
                  Material Marketplace
                </h3>
                <p className="text-gray-300 mt-2">
                  Simple way to browse and order construction materials.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold mb-6">
                  Submit Feedback
                </h2>

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border p-4 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-4 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />

                <div className="mb-4">
                  <label className="font-bold block mb-2">
                    Rating
                  </label>

                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Good</option>
                    <option value="3">⭐⭐⭐ Average</option>
                    <option value="2">⭐⭐ Poor</option>
                    <option value="1">⭐ Very Poor</option>
                  </select>
                </div>

                <textarea
                  rows="6"
                  placeholder="Write your feedback..."
                  className="w-full border p-4 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition"
                >
                  Submit Feedback
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>

                <h2 className="text-3xl font-bold text-green-600">
                  Thank You!
                </h2>

                <p className="text-gray-500 mt-4">
                  Your feedback has been submitted successfully.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Feedback;
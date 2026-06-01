import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />

      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-center">
          {[
            ["250+", "Verified Builders"],
            ["1200+", "Orders Delivered"],
            ["5000+", "Happy Customers"],
            ["₹10Cr+", "Projects Managed"],
          ].map(([num, label]) => (
            <div
              key={label}
              className="bg-white/10 border border-white/10 p-8 rounded-3xl hover:-translate-y-2 transition"
            >
              <h2 className="text-5xl font-extrabold text-orange-500">
                {num}
              </h2>
              <p className="mt-3 text-gray-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-orange-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-orange-500 font-bold uppercase tracking-widest">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-extrabold text-center mt-3 mb-14">
            Built For Smarter Construction
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              [
                "Cost Estimation",
                "Calculate construction costs instantly based on area, floors, material quality, labour cost, and project type.",
              ],
              [
                "Builder Discovery",
                "Find trusted builders near Kolkata and compare profiles, experience, ratings, and completed projects.",
              ],
              [
                "Material Marketplace",
                "Purchase cement, steel, bricks, sand, tiles and other materials with transparent pricing.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 hover:shadow-2xl transition"
              >
                <h3 className="text-2xl font-bold text-orange-500 mb-4">
                  {title}
                </h3>
                <p className="text-gray-600 leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Features />

      <section className="relative py-28 bg-slate-950 text-white text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f97316,transparent_35%)] opacity-30"></div>

        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold mb-6">
            Ready To Build Your Dream Project?
          </h2>

          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-300">
            Get cost estimates, find trusted builders, purchase materials,
            and manage your project from one powerful platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/calculator"
              className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition"
            >
              Estimate Cost
            </Link>

            <Link
              to="/marketplace"
              className="border border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition"
            >
              Buy Materials
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
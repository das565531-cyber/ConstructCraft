import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/75"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-orange-500/20 border border-orange-500/40 text-orange-300 px-5 py-2 rounded-full font-bold mb-6"
          >
            Smart Construction Management Platform
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-extrabold leading-tight"
          >
            Build Smarter.
            <br />
            <span className="text-orange-500">Construct Better.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-8 text-xl text-gray-300 leading-8 max-w-2xl"
          >
            Estimate costs, find trusted builders, buy real construction
            materials, track orders, and manage projects from one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/builders"
              className="bg-orange-500 px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition"
            >
              Find Builders
            </Link>

            <Link
              to="/calculator"
              className="border border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition"
            >
              Calculate Cost
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5"
            alt="Construction site"
            className="h-80 w-full object-cover rounded-3xl"
          />

          <div className="grid grid-cols-3 gap-4 mt-5">
            {[
              ["250+", "Builders"],
              ["1200+", "Orders"],
              ["AI", "Assistant"],
            ].map(([num, label]) => (
              <div key={label} className="bg-black/40 p-4 rounded-2xl text-center">
                <h3 className="text-3xl font-bold text-orange-500">{num}</h3>
                <p className="text-sm text-gray-300">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
function Stats() {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="grid md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">

        <div>
          <h2 className="text-5xl font-bold text-orange-500">
            250+
          </h2>
          <p>Verified Builders</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold text-orange-500">
            1200+
          </h2>
          <p>Orders Delivered</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold text-orange-500">
            5000+
          </h2>
          <p>Happy Customers</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold text-orange-500">
            ₹10Cr+
          </h2>
          <p>Projects Managed</p>
        </div>

      </div>
    </section>
  );
}

export default Stats;
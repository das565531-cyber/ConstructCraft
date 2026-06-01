import { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-gradient-to-br from-orange-50 via-white to-slate-100">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-orange-500 font-bold uppercase tracking-widest">
            Contact ConstructCraft
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-3">
            Let's Build Something Amazing
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Have questions about construction planning, builders,
            materials, or project management? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl">
            {!submitted ? (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  Send Us A Message
                </h2>

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border p-4 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border p-4 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full border p-4 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  <textarea
                    rows="6"
                    placeholder="Your Message"
                    className="w-full border p-4 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition"
                  >
                    Send Message
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>

                <h2 className="text-3xl font-bold text-green-600">
                  Message Sent Successfully
                </h2>

                <p className="text-gray-500 mt-4">
                  Thank you for contacting ConstructCraft.
                  We will get back to you soon.
                </p>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">

            <div className="bg-slate-950 text-white p-8 rounded-[2rem] shadow-xl">
              <h2 className="text-3xl font-bold mb-6">
                Contact Information
              </h2>

              <div className="space-y-5">

                <div>
                  <p className="text-orange-500 font-bold">
                    📍 Address
                  </p>

                  <p className="text-gray-300">
                    Kolkata, West Bengal, India
                  </p>
                </div>

                <div>
                  <p className="text-orange-500 font-bold">
                    📞 Phone
                  </p>

                  <p className="text-gray-300">
                    +91 98765 43210
                  </p>
                </div>

                <div>
                  <p className="text-orange-500 font-bold">
                    📧 Email
                  </p>

                  <p className="text-gray-300">
                    constructcraft@email.com
                  </p>
                </div>

              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl">
              <h2 className="text-2xl font-bold mb-4">
                Working Hours
              </h2>

              <div className="space-y-3 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
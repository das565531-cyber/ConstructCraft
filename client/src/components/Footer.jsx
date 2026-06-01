import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-3xl font-extrabold text-orange-500">
            ConstructCraft
          </h2>

          <p className="mt-4 text-gray-400 leading-7">
            Smart construction management platform for cost estimation,
            builders, materials, projects and AI assistance.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4">Quick Links</h3>
          <div className="space-y-3 text-gray-400">
            <p><Link to="/">Home</Link></p>
            <p><Link to="/builders">Builders</Link></p>
            <p><Link to="/calculator">Calculator</Link></p>
            <p><Link to="/marketplace">Materials</Link></p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4">Services</h3>
          <div className="space-y-3 text-gray-400">
            <p>Cost Estimation</p>
            <p>Material Shopping</p>
            <p>Project Tracking</p>
            <p>Invoice Generation</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4">Contact</h3>
          <div className="space-y-3 text-gray-400">
            <p>Kolkata, India</p>
            <p>constructcraft@email.com</p>
            <p>+91 98765 43210</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 text-center text-gray-500">
        © 2026 ConstructCraft. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
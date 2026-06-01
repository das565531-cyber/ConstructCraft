import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../services/supabase";
import useCartStore from "../store/cartStore";

function Navbar() {
  const [user, setUser] = useState(null);

  const cart = useCartStore((state) => state.cart);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user || null);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/95 backdrop-blur-lg border-b border-orange-500/20 shadow-xl">
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-orange-500 text-white font-black w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
            CC
          </div>

          <span className="text-orange-500 font-extrabold text-xl tracking-wide">
            ConstructCraft
          </span>
        </Link>

        <div className="hidden xl:flex items-center gap-5 text-white font-semibold text-[15px]">
          <Link to="/" className="hover:text-orange-500 transition">Home</Link>
          <Link to="/builders" className="hover:text-orange-500 transition">Builders</Link>
          <Link to="/calculator" className="hover:text-orange-500 transition">Calculator</Link>
          <Link to="/marketplace" className="hover:text-orange-500 transition">Materials</Link>
          <Link to="/rates" className="hover:text-orange-500 transition">Rates</Link>
          <Link to="/dashboard" className="hover:text-orange-500 transition">Projects</Link>
          <Link to="/profile" className="hover:text-orange-500 transition">Profile</Link>
          <Link to="/ai" className="hover:text-orange-500 transition">AI</Link>
          <Link to="/tracker" className="hover:text-orange-500 transition">Tracker</Link>
          <Link to="/contact" className="hover:text-orange-500 transition">Contact</Link>

          <Link
            to="/cart"
            className="hover:text-orange-500 transition flex items-center gap-2"
          >
            🛒 Cart

            {cartCount > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold min-w-[24px] h-6 px-2 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link
                to="/profile"
                className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white font-bold max-w-48"
              >
                👤
                <span className="truncate">
                  {userName}
                </span>
              </Link>

              <button
                onClick={logout}
                className="border border-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="border border-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition font-semibold"
            >
              Login
            </Link>
          )}

          <Link
            to="/admin-login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
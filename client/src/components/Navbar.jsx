import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import logo from "../assets/E2.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
    axios,
  } = useAppContext();

  // ✅ Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout", { withCredentials: true });
      if (data.success) {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  return (
    <nav
      className={`flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20   z-50 fixed top-0 w-full transition-all duration-300 
      ${
        scrolled
          ? "bg-gradient-to-r from-blue-200 via-blue-70 to-blue-200 shadow-md opacity-90"
          : "bg-transprent "
      }`}
    >
      {/* Logo */}
      <Link to="/" className="rounded-full p-[2px]">
        <img
          src={logo}
          alt="Logo"
          className="w-38 sm:w-32 md:w-38 object-contain"
        />
      </Link>

      {/* Hamburger Button */}
      <button
        className="md:hidden flex items-center focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <Link to="/AboutUs" className="hover:text-indigo-600 transition">About Us</Link>
        <Link to="/products" className="hover:text-indigo-600 transition">Products</Link>
        <Link to="/ContactSection" className="hover:text-indigo-600 transition">Contact</Link>

        {/* Cart */}
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#4f46e5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount()}
          </span>
        </div>

        {/* Authentication */}
        {user ? (
          <div className="relative group flex items-center gap-2 cursor-pointer">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-9 h-9 rounded-full border border-gray-200 p-1"
            />
            <span className="font-medium text-sm text-gray-700">
              {user?.name}
            </span>
            <ul className="absolute top-10 right-0 bg-white shadow-lg border rounded-md text-sm z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 min-w-[150px]">
              <li onClick={() => navigate("/my-orders")} className="px-4 py-2 hover:bg-gray-100 transition">My Orders</li>
              <li onClick={logout} className="px-4 py-2 hover:bg-gray-100 text-red-500 transition">Logout</li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-5 py-1.5 rounded-full transition"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[400px] py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 text-gray-700 font-medium text-sm">
          <Link onClick={() => setOpen(false)} to="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link onClick={() => setOpen(false)} to="/AboutUs" className="hover:text-indigo-600 transition">About Us</Link>
          <Link onClick={() => setOpen(false)} to="/products" className="hover:text-indigo-600 transition">Products</Link>
          <Link onClick={() => setOpen(false)} to="/ContactSection" className="hover:text-indigo-600 transition">Contact</Link>

          <div onClick={() => { setOpen(false); navigate("/cart"); }} className="cursor-pointer hover:text-indigo-600 transition">
            Cart ({cartCount()})
          </div>

          {user ? (
            <>
              <div onClick={() => { setOpen(false); navigate("/my-orders"); }} className="hover:text-indigo-600 cursor-pointer">
                My Orders
              </div>
              <div onClick={() => { setOpen(false); logout(); }} className="text-red-500 hover:text-red-600 cursor-pointer">
                Logout
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-5 py-1.5 rounded-full transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

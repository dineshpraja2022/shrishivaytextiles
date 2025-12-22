import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const SellerLayout = () => {
  const { isSeller, setIsSeller, axios, navigate } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

const sidebarLinks = [
  { name: "Dashboard", path: "/seller/dashboard", icon: assets.dashboard_icon },
  { name: "Add Product", path: "/seller/add-product", icon: assets.add_icon },
  { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
  { name: "Order Label", path: "/seller/orders", icon: assets.order_icon },   // Orders Page
  { name: "Orderlist", path: "/seller/Orderlist", icon: assets.Order_list_icon }, // Order List Page
];


  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        setIsSeller(false);
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-4 md:px-8 py-3 bg-[#000761] text-white shadow-md z-30">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-xl"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>
          <Link to="/">
            <h1 className="text-xl md:text-2xl font-semibold">Shri Shivay Textiles</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden sm:block">Sachin Dixit</p>
          <button
            onClick={logout}
            className="bg-white text-sky-600 text-sm px-4 py-1 rounded-full hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Layout Container */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar Overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static z-20 md:w-64 w-60 bg-[#01084D] text-white h-full pt-6 transition-transform duration-300 ease-in-out`}
        >
          <div className="md:hidden flex justify-end px-4 pb-2">
            <button onClick={() => setSidebarOpen(false)}>
              <FaTimes className="text-xl text-white" />
            </button>
          </div>

          <nav className="flex flex-col">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/seller"}
                className={({ isActive }) =>
                  `flex items-center py-3 px-5 gap-3 text-sm md:text-base transition-colors
                  ${
                    isActive
                      ? "bg-blue-700 text-white font-semibold"
                      : "hover:bg-blue-900 text-white"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <img src={item.icon} alt={item.name} className="w-5 h-5 invert" />
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">{item.name[0]}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;

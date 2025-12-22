import { Routes, Route, useLocation } from "react-router-dom";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/appContext";
import Auth from "./modals/Auth";
import ProductCategory from "./pages/ProductCategory";
import Address from "./pages/Address";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import AboutUs from "./pages/AboutUs";
import ContactSection from "./pages/ContactSection";
import QRModal from "./components/QRModal";
import BrandBondingSection from "./components/BrandBondingSection";
import EditProductForm from "./pages/seller/EditProductForm";
import WhatsAppButton from "./components/WhatsAppButton";
import Dashboard from "./pages/seller/Dashboard";
import Orderlist from "./pages/seller/orderlist";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <div className="text-default min-h-screen ">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Auth /> : null}
      <Toaster />
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-4 lg:px-2 xl:px-2"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/QRModal" element={<QRModal />} />
          <Route path="/BrandBondingSection" element={<BrandBondingSection />} />

          <Route path="/ContactSection" element={<ContactSection />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/product/:category/:id" element={<SingleProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProductForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<Address />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route className='mt-10'
        path="/seller"
        element={isSeller ? <SellerLayout /> : <SellerLogin />}
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="orders" element={<Orders />} />
        < Route path="Orderlist" element={<Orderlist/>}/>
      </Route>
        </Routes>
      </div>
       <WhatsAppButton />
      {isSellerPath ? null : <Footer />}
    </div>
  );
};
export default App;
import logo from "../assets/E2.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative text-gray-900 pt-14 pb-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-cover bg-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-blue-70 to-blue-200  z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Logo + About */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={logo} alt="Logo" className="w-40 sm:w-44 md:w-48 mb-4" />
            <p className="text-sm sm:text-sm md:text-base text-gray-800 leading-relaxed">
              Premium Handcrafted Lead Ropes, Horse Halters & Dog Collars made with superior quality & precision.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4 text-gray-800 text-2xl">
              <a href="#" className="hover:text-pink-600 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-blue-600 transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-sky-500 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-blue-700 transition"><i className="fab fa-linkedin"></i></a>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Company</h3>
            <ul className="space-y-3 text-base text-gray-700">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/AboutUs">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/ContactSection">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Address</h3>
            <ul className="space-y-2 text-base text-gray-700 leading-relaxed">
              <li>Shri Shivay Textiles</li>
              <li>Partapur Majra Rampur, Mahadev Trader</li>
              <li>Mardan Pur, Kanpur Nagar - 208021</li>
              <li>Uttar Pradesh, India</li>
              <li className="font-semibold mt-2 text-lg">+91 63947 69353</li>
              <li className="font-semibold text-lg">+91 97942 43644</li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Stay Updated</h3>
            <p className="text-base text-gray-700 mb-4">
              Get updates, offers and new arrivals of our handmade products.
            </p>

            <div className="flex w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900 rounded-l px-3 py-2 w-full text-base outline-none border border-gray-300"
              />
              <button className="bg-blue-600 hover:bg-blue-700 transition px-4 rounded-r flex items-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <hr className="border-black mt-10" />

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between py-4 text-base text-gray-700">
          <p>© {new Date().getFullYear()} Shri Shivay Textiles. All Rights Reserved.</p>
          <p>
            Design by{" "}
            <a
              href="https://www.vdelevatetechsolutions.com/"
              className="font-semibold hover:text-blue-700"
            >
              VD Elevate Tech Solutions
            </a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

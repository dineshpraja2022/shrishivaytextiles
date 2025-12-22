import { motion } from "framer-motion";
import { GiHorseHead, GiRopeCoil } from "react-icons/gi";
import { FaDog } from "react-icons/fa";

const products = [
  { id: 1, name: "Horse Halter", icon: <GiHorseHead /> },
  { id: 2, name: "Lead Rope", icon: <GiRopeCoil /> },
  { id: 3, name: "Dog Collar", icon: <FaDog /> },
  { id: 4, name: "Rope Halter", icon: <GiRopeCoil /> },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-blue-600"
        >
          Featured Products
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 mt-4 mb-16 max-w-2xl mx-auto"
        >
          Explore Indian craftsmanship at its finest. Shop now and bring home
          heritage with <span className="font-semibold text-gray-800">Shri Shivay Textiles</span>
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={item}
              whileHover={{ y: -12 }}
              className="relative group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 text-center cursor-pointer
                         shadow-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500"
            >
              {/* Gradient ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition"></div>

              {/* Icon */}
              <div className="relative z-10 w-20 h-20 mx-auto flex items-center justify-center rounded-full
                              bg-yellow-100 text-yellow-600 text-5xl
                              group-hover:bg-blue-600 group-hover:text-white
                              transition-all duration-500 shadow-md">
                {product.icon}
              </div>

              {/* Name */}
              <h3 className="relative z-10 mt-6 text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                {product.name}
              </h3>

              {/* Sub text */}
              <p className="relative z-10 mt-2 text-sm text-gray-500">
                Premium Quality & Export Grade
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

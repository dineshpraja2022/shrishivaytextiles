import ProductCard from "./ProductCard";
import { useAppContext } from "../context/appContext";
import { motion } from "framer-motion";

const BestSeller = () => {
  const { products } = useAppContext();
  const bestSellers = products.filter((product) => product.inStock).slice(0, 10);

  return (
    <section className="py-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32  relative overflow-hidden">

      {/* Decorative Gradient Blobs */}
      <div className="absolute top-10 -left-10 w-72 h-72 bg-blue-300 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 -right-10 w-80 h-80 bg-indigo-400 opacity-20 blur-3xl rounded-full"></div>

      {/* Heading */}
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center text-blue-600 mb-4 font-serif drop-shadow-md"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Best Sellers
      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 120 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="h-1 bg-indigo-600 mx-auto rounded-full shadow-lg shadow-indigo-300"
      />

      {/* Subtext */}
      <motion.p
        className="text-center text-gray-700 mb-14 text-sm sm:text-base md:text-lg max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        Most loved products picked specially for your pets 🐾
      </motion.p>

      {/* Product Grid */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">

        {bestSellers.map((product, index) => (
          <motion.div
            key={index}
            className="relative group rounded-3xl p-5 bg-white/80 backdrop-blur-lg border border-indigo-100
                       shadow-xl hover:shadow-2xl hover:shadow-indigo-300 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Glow on Hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                            bg-gradient-to-br from-indigo-200/40 to-blue-200/50 blur-xl transition duration-300"></div>

            <div className="relative z-10">
              <ProductCard product={product} />
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default BestSeller;

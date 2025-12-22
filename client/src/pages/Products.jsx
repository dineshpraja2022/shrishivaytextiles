import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/appContext";
import aboutHero from "../assets/prod.jpg"; // Replace with actual image
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Products = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div>
      {/* Hero Section */}
<section
  className="relative overflow-hidden bg-cover bg-center bg-no-repeat
  mt-[90px] sm:mt-[100px]"
  style={{ backgroundImage: `url(${aboutHero})` }}
>

        <div className="absolute inset-0 bg-black/60"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0.2}
          className="relative z-10 max-w-3xl px-6 py-20 md:px-12 text-white"
        >
          <motion.h2
            variants={fadeIn}
            custom={0.3}
            className="text-4xl md:text-5xl font-serif font-bold drop-shadow-md"
          >
            Shri Shivay Textiles – Our Premium Product Range
          </motion.h2>

          <motion.p
            variants={fadeIn}
            custom={0.6}
            className="mt-5 text-white/90 text-lg font-light"
          >
            Have questions about our premium
            <span className="text-indigo-300 font-medium">
              {" "}Lead Ropes, Dog Collars, or Horse Halters
            </span>
            ? We’re here to help!
          </motion.p>

          <motion.p
            variants={fadeIn}
            custom={0.8}
            className="mt-3 text-white/80 text-base font-light"
          >
            Whether you’re looking for stylish dog collars, strong and durable lead ropes, or elegant horse halters, Shri Shivay Textiles delivers the best for your pets and animals. For bulk orders, product inquiries, or partnership opportunities, connect with us.
          </motion.p>
        </motion.div>
      </section>

      {/* Products Section */}
   {/* Products Section */}
<div className="mt-24 px-4 md:px-10 min-h-screen">
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeIn}
    className="text-center mb-12"
  >
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
      Explore Our Products
    </h1>
    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
      Discover a wide range of quality products available in stock. Choose the best for yourself.
    </p>
  </motion.div>

  {filteredProducts.filter((product) => product.inStock).length > 0 ? (
    <motion.div
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      variants={containerStagger}
      initial="hidden"
      animate="visible"
    >
      {filteredProducts
        .filter((product) => product.inStock)
        .map((product, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            custom={index * 0.1}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
    </motion.div>
  ) : (
    <div className="text-center py-20 text-gray-500 text-xl">
      No products found.
    </div>
  )}
</div>

    </div>
  );
};

export default Products;

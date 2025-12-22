import React from "react";
import beadImage from "../assets/29557246.jpg";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const BrandBondingSection = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-20 text-center ">
      
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-gray-800 font-poppins mb-4"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Handcrafted Bonds, Unmatched Durability
      </motion.h2>

      <motion.p
        className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg mb-8 font-light"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        At Shri Shivay Textiles, every thread, every weave is a reflection of our promise – 
        to deliver comfort, elegance, and timeless quality with every fabric you choose.
      </motion.p>

      <motion.div
        className="flex justify-center my-6"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <img
          src={beadImage}
          alt="Bead knot symbol"
          className="w-40 xl:w-96 lg:w-96 md:w-60 object-contain"
        />
      </motion.div>

      <motion.p
        className="text-gray-500 italic font-medium"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        "Bound not by a string, but by trust."
      </motion.p>
    </section>
  );
};

export default BrandBondingSection;

import React from "react";
import pratibha from "../assets/sachin.jpeg";
import aboutHero from "../assets/abouthero.jpg";
import { motion } from "framer-motion";

// Animation variant defined
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Sachin = () => {
  return (
    <div className="text-gray-800 font-sans">
      {/* About Us Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.img
            src={pratibha}
            alt="Founder Mr. Sachin Dixit"
            className="rounded-2xl w-full max-w-sm mx-auto shadow-[0_0_40px_#3b82f680]"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <p className="text-xl font-semibold mt-4 text-gray-700 font-serif drop-shadow-md shadow-black">
            Mr. Sachin Dixit
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-sm text-indigo-600 uppercase font-semibold tracking-widest mb-3">
            About Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6 font-serif">
            Meet the Heart of <span className="text-indigo-600">Our Company</span>
          </h2>
          <div className="space-y-5 text-[17px] text-gray-700 leading-[1.8] text-justify font-light">
            <p>
              <strong className="text-indigo-600 font-medium">Shri Shivay Textiles</strong> is more than a brand — it's a story of dedication, passion, and human craftsmanship.
            </p>
            <p>
              Founded by <strong>Mr. Sachin Dixit</strong>, our journey is rooted in values of tradition and trust.
              For over 5 years, we’ve been handcrafting premium-quality ropes and accessories like <strong>horse ropes, dog leashes, halters, and animal leads</strong>.
              From Mardanpur, Kanpur (U.P.), we blend tradition with modern aesthetics to deliver reliable, stylish, and strong products.
            </p>
            <p>
              Every item tells a story and every rope carries the promise of <strong className="text-indigo-600">trust, love, and long-lasting quality</strong>.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Sachin;

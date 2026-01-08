import React from "react";
import pratibha from "../assets/sachin.jpeg";
import { motion } from "framer-motion";

// Animation
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Sachin = () => {
  return (
    <section className="relative bg-gradient-to-b from-indigo-50 via-white to-blue-50 py-24 overflow-hidden">

      {/* Soft background glow */}
      <div className="absolute top-24 left-20 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-24 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

        {/* LEFT IMAGE */}
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
            className="rounded-2xl w-full max-w-sm mx-auto
            shadow-[0_20px_60px_rgba(59,130,246,0.35)]"
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 220 }}
          />

          <p className="text-xl font-semibold mt-6 text-gray-800 font-serif">
            Mr. Sachin Dixit
          </p>
          <p className="text-sm text-blue-400 font-medium">
            Founder & Manufacturer
          </p>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-block mb-3 text-sm font-semibold tracking-widest text-blue-400 uppercase">
            About Us
          </span>

          <h2 className="text-4xl font-serif font-bold leading-tight mb-6">
            Meet the Heart of <br />
            <span className="text-blue-400">Shri Shivay Textiles</span>
          </h2>

          <div className="w-24 h-[3px] bg-indigo-500 mb-8 rounded-full"></div>

          <div className="space-y-6 text-[17px] text-gray-700 leading-[1.9] text-justify">
            <p>
              <strong className="text-blue-400">Shri Shivay Textiles</strong> is
              more than a manufacturing unit — it is a professionally built
              enterprise driven by passion, integrity, and a commitment to
              excellence. What began as a clear vision has evolved into a trusted
              name known for quality craftsmanship and reliable production.
            </p>

            <p>
              Founded by <strong>Mr. Sachin Dixit</strong>, the company brings
              over <strong>five years of hands-on industry experience</strong> in
              manufacturing premium equestrian and pet accessories. Our core
              product range includes <strong>horse ropes, dog collars, halters,
              and animal leads</strong>, each crafted with precision, durability,
              and user comfort in mind.
            </p>

            <p>
              Operating from <strong>Mardanpur, Kanpur (U.P.)</strong>, Shri
              Shivay Textiles combines traditional craftsmanship with modern
              manufacturing practices. Every product reflects our promise of
              <strong className="text-blue-400">
                strength, consistency, and long-lasting quality
              </strong>, making us a reliable partner for domestic and export
              markets alike.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Sachin;

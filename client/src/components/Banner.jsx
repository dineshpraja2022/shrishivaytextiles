import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import banner from "../assets/theams.png";

// Images (better agar different ho)
import p1 from "../assets/nylon-rope-dog-collor-500x500.jpg";
import p2 from "../assets/polyester-horse-lead-rope-halter-500x500.jpg";
import p3 from "../assets/ysafdhgsafha.jpg";

const texts = [
  "Premium Horse Halters Built for Strength & Reliability",
  "Export Quality Dog Collars Crafted with Precision",
  "Strong & Stylish Lead Ropes Trusted Worldwide",
  "Where Craftsmanship Meets Durability – Made for Professionals",
];

const images = [p1, p2, p3];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((p) => (p + 1) % texts.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mt-[96px] w-full h-[120vh] min-h-[520px] lg:h-[90vh] overflow-hidden">

      {/* BACKGROUND */}
      <img
        src={banner}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-blue-700/30 to-orange-500/20" />

      {/* GLOW */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-20 w-52 h-52 bg-orange-400/30 blur-3xl rounded-full"
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 h-full flex flex-col lg:flex-row items-center justify-between gap-14">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex-1 text-white text-center lg:text-left"
        >
          <p className="text-orange-400 uppercase tracking-[5px] font-semibold mb-3">
            Trusted Export Manufacturers
          </p>

          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, x: -80, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
              exit={{ opacity: 0, x: 80, filter: "blur(6px)" }}
              transition={{ duration: 0.8 }}
              className="font-extrabold leading-tight text-[28px] sm:text-[40px] md:text-[52px] lg:text-[58px] max-w-2xl mx-auto lg:mx-0"
            >
              {texts[index]}
            </motion.h1>
          </AnimatePresence>

          <p className="text-gray-200 mt-5 max-w-lg mx-auto lg:mx-0">
            Horse halters, dog collars, and lead ropes engineered with premium
            craftsmanship trusted worldwide.
          </p>

          <div className="flex gap-4 mt-8 justify-center lg:justify-start">
            <Link to="/products" className="px-10 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold">
              View Products
            </Link>
            <Link to="/products" className="px-10 py-3 bg-white text-black rounded-xl font-semibold">
              Explore Deals →
            </Link>
          </div>
        </motion.div>

        {/* RIGHT – IMAGE SLIDER */}
        <motion.div className="flex-1 flex justify-center relative">

          <div className="absolute w-[420px] h-[420px] bg-orange-500/20 rounded-full blur-3xl" />

          <div className="relative w-[320px] sm:w-[380px] h-[380px] rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIndex}
                src={images[imgIndex]}
                alt="Product"
                initial={{ opacity: 0, scale: 0.7, rotate: -8, x: 100 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 8, x: -100 }}
                transition={{ duration: 0.9 }}
                className="absolute inset-0 w-full h-full object-contain p-6"
              />
            </AnimatePresence>
          </div>

          {/* FLOATING BADGES */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-6 right-10 bg-white px-4 py-2 rounded-full text-sm font-semibold shadow"
          >
            Export Quality ✔
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Banner;

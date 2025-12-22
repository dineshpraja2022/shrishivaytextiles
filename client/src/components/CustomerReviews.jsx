import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Ravi",
    review: "The halters are extremely strong and premium. Best quality I’ve seen in India!",
  },
  {
    name: "Sneha",
    review: "Beautiful dog collars! Very comfortable for my pet and looks stylish.",
  },
  {
    name: "Arjun",
    review: "Super-fast delivery and excellent finishing. The lead rope is perfect.",
  },
];

const Testimonial = () => {
  return (
    <section className="relative py-28 px-6 md:px-24  overflow-hidden">

      {/* Floating Gradient Lights */}
      <div className="absolute top-[-120px] right-[-150px] w-[400px] h-[400px] "></div>
      <div className="absolute bottom-[-120px] left-[-150px] w-[400px] h-[400px] "></div>

      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-20"
      >
        What Our <span className="text-blue-600">Customers Say</span>
        <span className="block w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
      </motion.h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: i * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              rotateX: 6,
              rotateY: -6,
              transition: { type: "spring", stiffness: 180 }
            }}
            className="relative bg-white/40 backdrop-blur-xl border border-white/30 
                       shadow-xl rounded-3xl p-10 overflow-hidden group"
          >

            {/* Glow circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-purple-200/10 opacity-30 rounded-3xl"></div>

            {/* Floating Quote Icon */}
            <FaQuoteLeft className="absolute top-6 left-6 text-blue-600/20 text-5xl" />

            {/* Animated Stars */}
            <div className="flex justify-center mb-6 z-20 relative">
              {[...Array(5)].map((_, idx) => (
                <FaStar
                  key={idx}
                  className="text-yellow-400 text-xl mx-1 transition-transform duration-300 group-hover:scale-125"
                />
              ))}
            </div>

            {/* Review */}
            <p className="text-gray-700 italic text-lg leading-relaxed mb-6 relative z-20">
              “{t.review}”
            </p>

            {/* Name */}
            <h4 className="font-bold text-blue-800 text-xl text-center relative z-20">
              — {t.name}
            </h4>

            {/* Shine effect */}
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-20 transition-all duration-700 rounded-3xl"></span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;

import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const CategoryCardSlider = () => {
  const { navigate } = useAppContext();

  const handleClick = (path) => {
    navigate(`/products/${path.toLowerCase()}`);
    scrollTo(0, 0);
  };

  return (
    <section className="mt-24 px-12 md:px-12">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-[#003366] mb-14"
      >
        Shop by <span className="text-blue-600">Category</span>
      </motion.h2>

      {/* Slider */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={30}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2.2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {categories.map(({ path, image, text, bgColor }, index) => (
          <SwiperSlide key={index}>
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleClick(path)}
              className="cursor-pointer bg-white rounded-3xl border-b border-gray-300 p-6 
                          hover:shadow-2xl hover:shadow-blue-400 transition-all duration-300
                         border border-gray-100"
            >
              {/* Image Card */}
              <div
                className="h-44 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: `linear-gradient(135deg, ${bgColor}, #ffffff)`,
                }}
              >
                <img
                  src={image}
                  alt={text}
                  className="w-28 h-28 object-contain drop-shadow-lg"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-center text-gray-800">
                {text}
              </h3>

              {/* Sub line */}
              <p className="text-sm text-center text-gray-500 mt-1">
                View Products →
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoryCardSlider;

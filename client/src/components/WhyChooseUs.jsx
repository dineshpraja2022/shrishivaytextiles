import mainImg from "../assets/81l+wCD6PGL._UF894,1000_QL80_.jpg";   // big image
import smallImg from "../assets/rtyu.jpg"; // small image

const WhyChooseUs = () => {
  return (
    <section className="bg-blue-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
            Why Shri Shivay Textiles
          </h2>

          <div className="w-20 h-[2px] bg-blue-300 mt-4 mb-6"></div>

          <p className="text-gray-700 leading-relaxed mb-6">
            At Shri Shivay Textiles, we proudly stand as a one-stop solution for premium equestrian and pet accessories. We specialize in manufacturing high-quality horse halters, lead ropes, dog collars, rope halters, and related products—crafted with precision, strength, and care. Our products are fully customizable to meet client requirements, ensuring the perfect balance of durability, comfort, and style for both domestic and export markets.
          </p>

          {/* Icons */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-orange-500 text-xl">🏭</span>
              <span className="text-gray-800 font-medium">Manufacturer</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-orange-500 text-xl">🏠</span>
              <span className="text-gray-800 font-medium">Whole Sale</span>
            </div>
          </div>

          <button className="bg-blue-300 hover:bg-blue-400 text-black font-medium px-8 py-3 rounded transition">
            Read More
          </button>
        </div>

        {/* Right Images */}
        <div className="relative flex justify-center md:justify-end">
          
          {/* Big Image */}
          <div className="w-[280px] sm:w-[360px] md:w-[420px] rounded-[180px] overflow-hidden">
            <img
              src={mainImg}
              alt="Indian Craft"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Small Overlap Image */}
          <div className="absolute bottom-[-40px] left-1/2 md:left-auto md:right-40 transform -translate-x-1/2 md:translate-x-0 w-[180px] sm:w-[220px] rounded-[120px] overflow-hidden shadow-lg bg-white p-2">
            <img
              src={smallImg}
              alt="Decor"
              className="w-full h-full object-cover rounded-[110px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

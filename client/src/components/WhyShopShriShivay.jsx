import {
  FaTruck,
  FaUndoAlt,
  FaCreditCard,
  FaGift,
} from "react-icons/fa";

const features = [
  {
    icon: <FaTruck />,
    title: "Free Shipping",
    desc: "Once receiving your order, we dispatch your products within 13–15 business days.",
  },
  {
    icon: <FaUndoAlt />,
    title: "Free Returns",
    desc: "We accept returns for freshly purchased products within 7 days of delivery.",
  },
  {
    icon: <FaCreditCard />,
    title: "Secure Payment",
    desc: "Ensure safe and hassle-free transactions with our encrypted payment system.",
  },
  {
    icon: <FaGift />,
    title: "Free Wrapping",
    desc: "On request, gift orders can receive complimentary premium wrapping service.",
  },
];

const WhyShopShriShivay = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl  text-gray-900">
          The difference when you shop{" "}
          <span className="text-bold text-blue-600">Shri Shivay Textiles</span>!
        </h2>

        <span className="block w-24 h-[2px] bg-blue-400 mx-auto mt-6 mb-8"></span>

        <p className="max-w-3xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed mb-16">
          Every product at Shri Shivay Textiles reflects quality, strength, and
          craftsmanship. From premium horse halters and lead ropes to durable
          dog collars, each item is carefully manufactured and customized to
          meet client requirements.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-10 transition-all duration-300 hover:shadow-xl hover:shadow-blue-200 hover: hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-blue-400 flex items-center justify-center mx-auto mb-6 text-white text-3xl">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-serif text-gray-900 mb-4">
                {item.title}
              </h3>

              <span className="block w-12 h-[2px] bg-blue-400 mx-auto mb-4"></span>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyShopShriShivay;

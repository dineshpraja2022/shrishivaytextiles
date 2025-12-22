import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeadset,
} from "react-icons/fa";
import { motion } from "framer-motion";
import aboutHero from "../assets/ccn.jpg";

const contactCards = [
  {
    title: "Contact Sales",
    desc: "Talk to our helpful team.",
    info: "shrishivaytextiles001@gmail.com",
    icon: <FaEnvelope />,
    iconBg: "bg-blue-500",
  },
  {
    title: "Contact Support",
    desc: "We're ready to assist you.",
    info: "shrishivaytextiles001@gmail.com",
    icon: <FaHeadset />,
    iconBg: "bg-green-500",
  },
  {
    title: "Visit Us",
    desc: "Mardanpur, Kanpur, Uttar Pradesh",
    info: "India - 208001",
    icon: <FaMapMarkerAlt />,
    iconBg: "bg-purple-500",
  },
  {
    title: "Call Us",
    desc: "Available 9am to 6pm (Mon-Sat)",
    info: "+91-9794243644, +91-6394769353",
    icon: <FaPhoneAlt />,
    iconBg: "bg-pink-500",
  },
];

const ContactSection = () => {
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl px-6 py-20 md:px-12 text-white"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold drop-shadow-md">
            Get in Touch
          </h2>

          <p className="mt-5 text-white/90 text-lg font-light">
            Have questions about our products or need assistance?{" "}
            <span className="text-indigo-300 font-medium">
              We’re here to help!
            </span>
          </p>

          <p className="mt-3 text-white/80 text-base font-light">
            Reach out to Shri Shivay Textiles for bulk orders, product inquiries,
            or partnership opportunities. Our team will respond to your message
            as soon as possible.
          </p>

          <a
            href="#contact-form"
            className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </section>

      {/* Contact Cards Section */}
      <div className="bg-gradient-to-b from-white via-blue-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We'd love to hear from you. Whether you're curious about features,
              a free trial, or even press—we're ready to answer any and all
              questions.
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group rounded-2xl bg-white p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-lg text-white text-xl ${item.iconBg} shadow-md`}
                >
                  {item.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-500">{item.desc}</p>
                <p className="mt-3 text-sm font-medium text-blue-600">
                  {item.info}
                </p>
              </motion.div>
            ))}
          </div>

          {/* About Seller Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-24 max-w-4xl mx-auto text-center px-4"
          >
            <h3 className="text-3xl font-bold text-gray-800">
              Shri Shivay Textiles
            </h3>
            <p className="mt-4 text-lg text-gray-700">
              <strong>Shri Shivay Textiles</strong> provides the best range of{" "}
              <strong>
                Horse Rope, Horse Halter, Dog Lead Rope, Dog Collar
              </strong>
              , and more with effective and timely delivery since 2024 in
              Kanpur, Uttar Pradesh.
            </p>
            <p className="mt-4 text-md text-gray-600">
              We also specialize in{" "}
              <strong>
                belt goods, crafting materials, and handmade products
              </strong>
              . Our company is led by{" "}
              <strong>Mr. Sachin Dixit</strong>, who has over 5 years of
              experience in textile manufacturing and animal accessory
              production.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

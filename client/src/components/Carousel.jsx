import { useState, useEffect } from "react";
import img1 from "../assets/kasjfhkjhfKJ.jpg";
import img2 from "../assets/rsrsrsxgcugi.jpg";
import img3 from "../assets/kasjfhkjhfKJ.jpg";
import img4 from "../assets/ysafdhgsafha.jpg";
import img5 from "../assets/dagh.jpg";
import img6 from "../assets/71ANsEM9+zL.jpg";

const fallbackImage =
  "https://via.placeholder.com/600x400.png?text=Image+Not+Available";

const data = [
  {
    title: "Premium Horse Halter",
    description:
      "Strong, durable and comfortable horse halters crafted for daily use and long-lasting performance.",
    image: img1,
  },
  {
    title: "Durable Dog Collar",
    description:
      "High-quality dog collars designed for comfort, strength and adjustable fit.",
    image: img2,
  },
  {
    title: "Horse Lead Rope",
    description:
      "Premium lead ropes offering a secure grip, strength and smooth handling.",
    image: img3,
  },
  {
    title: "Dog Lead Rope",
    description:
      "Durable and tangle-free dog lead ropes for safe and comfortable walks.",
    image: img4,
  },
  {
    title: "Rope Halter",
    description:
      "Handcrafted rope halters ideal for training, control and comfort.",
    image: img5,
  },
  {
    title: "Training Lead Rope",
    description:
      "Specially designed training lead ropes offering flexibility and strength.",
    image: img6,
  },
];

export default function ImageAccordion() {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelected((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      {/* Section Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Our Product Range
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Premium horse and pet accessories crafted with quality, strength and
          customization by <b>Shri Shivay Textiles</b>
        </p>
        <span className="block w-24 h-1 mx-auto mt-5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          <img
            src={data[selected].image || fallbackImage}
            alt={data[selected].title}
            onError={(e) => (e.target.src = fallbackImage)}
            className="w-full h-[420px] object-cover transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl md:text-3xl font-bold">
              {data[selected].title}
            </h3>
            <p className="text-sm mt-2 opacity-90">
              Crafted with precision & care
            </p>
          </div>
        </div>

        {/* Right Accordion */}
        <div className="flex flex-col gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelected(index)}
              className={`group p-5 rounded-2xl border transition-all duration-400 cursor-pointer
                ${
                  selected === index
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-[1.02]"
                    : "bg-white hover:bg-gray-50 border-gray-200 text-gray-800 shadow-sm"
                }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-base md:text-lg font-semibold">
                  {item.title}
                </h4>
                <span
                  className={`text-xl transition-transform duration-300 ${
                    selected === index ? "rotate-90" : ""
                  }`}
                >
                  ➜
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  selected === index
                    ? "max-h-24 mt-3 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm leading-relaxed opacity-90">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

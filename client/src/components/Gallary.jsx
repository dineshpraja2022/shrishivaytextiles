import React from "react";
import img1 from "../assets/esi.jpg";
import img2 from "../assets/es2.jpg";
import img3 from "../assets/es3.jpg";
import img4 from "../assets/es4.jpg";
import img5 from "../assets/es5.jpg";
import video1 from "../assets/video1.mp4";

export function Gallary() {
  const data = [
    { type: "video", src: video1 },
    { type: "image", src: img1 },
    { type: "image", src: img2 },
    { type: "image", src: img3 },
    { type: "image", src: img4 },
    { type: "image", src: img5 },
    
  ];

  const [active, setActive] = React.useState(data[0]);

  return (
    <div className="py-12 ">
      {/* Main Display */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 transition-all duration-500">
          {active.type === "image" ? (
            <img
              src={active.src}
              alt="Main Display"
              className="w-full h-[260px] sm:h-[400px] md:h-[550px] lg:h-[620px] object-cover object-center transition-all duration-700 scale-[1.01]"
            />
          ) : (
            <video
              controls
              className="w-full h-[260px] sm:h-[400px] md:h-[550px] lg:h-[620px] object-cover object-center transition-all duration-700"
            >
              <source src={active.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-blue-600 text-3xl">🖼️</span>
          Our Gallery
          <span className="block w-24 h-1 bg-blue-600 rounded-full ml-3"></span>
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => setActive(item)}
              className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                active.src === item.src
                  ? "border-blue-500 shadow-md shadow-blue-200"
                  : "border-transparent"
              } hover:shadow-xl`}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-24 sm:h-28 md:h-32 object-cover transform group-hover:scale-105 transition duration-300"
                />
              ) : (
                <div className="relative">
                  <video
                    muted
                    className="w-full h-24 sm:h-28 md:h-32 object-cover transform group-hover:scale-105 transition duration-300"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-black"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 4l12 6-12 6V4z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

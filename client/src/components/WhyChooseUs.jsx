import mainImg from "../assets/81l+wCD6PGL._UF894,1000_QL80_.jpg";
import smallImg from "../assets/rtyu.jpg";

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 md:py-28">
      
      {/* Background Blur Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-3 text-sm font-semibold tracking-widest text-blue-500 uppercase">
            About Us
          </span>

          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
            Why Choose <br />
            <span className="text-blue-500">Shri Shivay Textiles</span>
          </h2>

          <div className="w-24 h-[3px] bg-blue-400 mt-6 mb-8 rounded-full"></div>

          <p className="text-gray-700 leading-relaxed mb-10">
            Shri Shivay Textiles is a trusted manufacturer and wholesale supplier
            of premium equestrian and pet accessories. From horse halters and
            lead ropes to dog collars and rope halters — every product is crafted
            with durability, comfort, and export-quality finishing.
          </p>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl">
                🏭
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Manufacturer
                </h4>
                <p className="text-sm text-gray-600">
                  In-house production
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl">
                🏠
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Wholesale Supply
                </h4>
                <p className="text-sm text-gray-600">
                  Bulk & export orders
                </p>
              </div>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition">
            Read More
            <span>→</span>
          </button>
        </div>

        {/* RIGHT IMAGE DESIGN */}
        <div className="relative flex justify-center md:justify-end">

          {/* Main Image */}
          <div className="relative w-[320px] sm:w-[400px] md:w-[450px] aspect-[4/5]
            rounded-[55%_45%_40%_60%] overflow-hidden shadow-2xl border-8 border-white">
            <img
              src={mainImg}
              alt="Shri Shivay Textiles Craft"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Small Image */}
          <div className="absolute -bottom-14 left-1/2 md:left-auto md:right-40 transform -translate-x-1/2 md:translate-x-0">
            <div className="bg-white p-3 rounded-2xl shadow-2xl">
              <div className="w-[180px] sm:w-[220px] aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={smallImg}
                  alt="Detail View"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

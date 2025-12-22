const dummyProducts = [
  { name: "Classic Dog Collar", price: "₹299", image: "/assets/pro1.jpg" },
  { name: "Heavy Horse Halter", price: "₹499", image: "/assets/pro2.jpg" },
  { name: "Braided Lead Rope", price: "₹399", image: "/assets/pro3.jpg" },
  { name: "Padded Dog Collar", price: "₹349", image: "/assets/pro4.jpg" },
  { name: "Premium Halter", price: "₹599", image: "/assets/pro5.jpg" },
  { name: "Rugged Lead Rope", price: "₹459", image: "/assets/pro6.jpg" },
];

const ProductShowcase = () => {
  return (
    <div id="products" className="bg-gray-50 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Popular Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 md:px-10">
        {dummyProducts.map((p, i) => (
          <div key={i} className="bg-white shadow rounded-xl overflow-hidden hover:shadow-xl transition-all">
            <img src={p.image} alt={p.name} className="w-full h-64 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-blue-600 font-semibold mt-2">{p.price}</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;

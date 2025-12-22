const categories = [
  { name: "Dog Collars", image: "/assets/dog-collar.jpg" },
  { name: "Horse Halters", image: "/assets/horse-halter.jpg" },
  { name: "Lead Ropes", image: "/assets/lead-rope.jpg" },
];

const CategoryShowcase = () => {
  return (
    <div className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform">
            <img src={cat.image} alt={cat.name} className="h-60 w-full object-cover" />
            <div className="p-4 font-semibold text-xl">{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryShowcase;

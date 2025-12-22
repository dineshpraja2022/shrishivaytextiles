import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const SingleProduct = () => {
  const { products, navigate, addToCart } = useAppContext();
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = products.find((p) => p._id === id);

  useEffect(() => {
    if (product) setThumbnail(product.image[0]);
  }, [product]);

  useEffect(() => {
    if (products.length && product) {
      const related = products.filter(
        (p) => p.category === product.category && p._id !== product._id
      );
      setRelatedProducts(related.slice(0, 4));
    }
  }, [products, product]);

  if (!product) return null;

  return (
    <div className="mt-28 max-w-7xl mx-auto px-4">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-indigo-500">Home</Link> /
        <Link to="/products" className="hover:text-indigo-500"> Products</Link> /
        <span className="text-indigo-500"> {product.name}</span>
      </p>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        
        {/* Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.image.map((img, i) => (
              <div
                key={i}
                onClick={() => setThumbnail(img)}
                className={`border rounded-xl overflow-hidden cursor-pointer
                  ${thumbnail === img
                    ? "border-indigo-500 shadow-md shadow-blue-400/40"
                    : "border-gray-200 hover:border-indigo-400"}`}
              >
                <img
                  src={`http://localhost:5000/images/${img}`}
                  alt=""
                  className="w-20 h-20 object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200
                          shadow-lg shadow-blue-400/30 bg-white">
            <img
              src={`http://localhost:5000/images/${thumbnail}`}
              alt={product.name}
              className="w-full h-[420px] object-contain hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill("").map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                className="w-4"
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">(4 Reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-6 bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-400 line-through">
              MRP ₹{product.price}
            </p>
            <p className="text-3xl font-bold text-indigo-600">
              ₹{product.offerPrice}
            </p>
            <span className="text-xs text-gray-500">
              Inclusive of all taxes
            </span>
          </div>

          {/* Description */}
          <h3 className="mt-8 font-semibold text-lg">About this product</h3>
          <ul className="list-disc ml-5 mt-3 text-gray-600 space-y-1">
            {product.description.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={() => addToCart(product._id)}
              className="flex-1 py-3 rounded-xl border border-gray-300
                         hover:bg-gray-100 transition font-medium"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
                scrollTo(0, 0);
              }}
              className="flex-1 py-3 rounded-xl bg-indigo-500 text-white
                         hover:bg-indigo-600 shadow-lg shadow-blue-400/40
                         transition font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24">
        <h2 className="text-2xl font-semibold text-center">
          Related Products
        </h2>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-3 rounded-full"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {relatedProducts
            .filter((p) => p.inStock)
            .map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="mt-10 px-10 py-3 rounded-xl bg-indigo-500 text-white
                       hover:bg-indigo-600 transition shadow-md shadow-blue-400/40"
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

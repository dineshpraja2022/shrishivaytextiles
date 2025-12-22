import { assets } from "../assets/assets";
import { useAppContext } from "../context/appContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/product/${product.category.toLowerCase()}/${product?._id}`);
          scrollTo(0, 0);
        }}
        className="relative border border-gray-100 rounded-2xl p-4 bg-white w-full max-w-xs mx-auto 
                   shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
      >
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>

        {/* Product Image */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 h-44">
          <img
            src={`http://localhost:5000/images/${product.image[0]}`}
            alt={product.name}
            className="max-h-36 object-contain transform group-hover:scale-110 transition-transform duration-500"
          />

          {/* Quick View Button (hover only) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.category.toLowerCase()}/${product?._id}`);
            }}
            className="absolute bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 
                       bg-white text-blue-600 text-sm font-medium px-3 py-1.5 rounded-lg shadow hover:bg-blue-50"
          >
            Quick View
          </button>
        </div>

        {/* Product Info */}
        <div className="mt-4 relative z-10">
          <p className="capitalize text-xs text-gray-500 tracking-wide">{product.category}</p>
          <p className="text-gray-800 font-semibold text-base md:text-lg truncate group-hover:text-blue-600 transition">
            {product.name}
          </p>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
            <p className="text-xs text-gray-500 ml-1">(4)</p>
          </div>

          {/* Price + Cart Actions */}
          <div className="flex items-end justify-between mt-4">
            <p className="text-blue-600 font-bold text-lg md:text-xl">
              ₹{product.offerPrice}{" "}
              <span className="line-through text-gray-400 text-sm ml-1">{product.price}</span>
            </p>

            <div onClick={(e) => e.stopPropagation()} className="text-blue-500">
              {!cartItems?.[product?._id] ? (
                <button
                  onClick={() => addToCart(product?._id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-blue-600 text-white 
                             rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition"
                >
                  <img
                    src={assets.cart_icon}
                    alt="cart"
                    className="w-4 filter brightness-0 invert"
                  />
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg shadow-inner border border-blue-100">
                  <button
                    onClick={() => removeFromCart(product?._id)}
                    className="text-lg font-bold px-2 text-blue-700 hover:text-blue-900"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-6 text-center text-gray-700">
                    {cartItems[product?._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product?._id)}
                    className="text-lg font-bold px-2 text-blue-700 hover:text-blue-900"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;

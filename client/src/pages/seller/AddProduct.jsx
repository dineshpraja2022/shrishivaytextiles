import { assets, categories } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { axios } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);
      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }

      const { data } = await axios.post("/api/product/add-product", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-50 flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white border border-gray-200 shadow-xl rounded-2xl p-6 md:p-10 space-y-8"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-600">
          Add New Product
        </h2>

        {/* Image Upload */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">
            Upload Images (Max 4)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="border border-dashed border-indigo-300 bg-indigo-50/30 rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition"
                >
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="upload"
                    className="w-full h-24 object-cover"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="product-name" className="block text-base font-semibold text-gray-700">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Lead Rope,Horse Halter..."
            className="w-full mt-2 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="product-description" className="block text-base font-semibold text-gray-700">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write details, specifications or features..."
            className="w-full mt-2 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label htmlFor="category" className="block text-base font-semibold text-gray-700">
            Select Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-2 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Choose Category</option>
            {categories.map((cat, index) => (
              <option value={cat.path} key={index}>
                {cat.path}
              </option>
            ))}
          </select>
        </div>

        {/* Price and Offer Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="product-price" className="block text-base font-semibold text-gray-700">
              Product Price (₹)
            </label>
            <input
              id="product-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full mt-2 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="offer-price" className="block text-base font-semibold text-gray-700">
              Offer Price (₹)
            </label>
            <input
              id="offer-price"
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="Discounted price"
              className="w-full mt-2 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="inline-block w-full sm:w-auto px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

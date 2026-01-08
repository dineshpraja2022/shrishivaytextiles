import { assets, categories } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
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

    // 🔒 Basic validation
    if (!name || !category || !price || !offerPrice) {
      return toast.error("Please fill all required fields");
    }

    if (files.filter(Boolean).length === 0) {
      return toast.error("Please upload at least one image");
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      // ✅ IMPORTANT: only valid files
      files.forEach((file) => {
        if (file) {
          formData.append("image", file);
        }
      });

    const { data } = await axios.post(
  "/api/product/add-product",
  formData,
  {
    withCredentials: true, // 🔥 cookie bhejne ke liye MUST
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      if (data.success) {
        toast.success(data.message || "Product added successfully");

        // 🔄 Reset form
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unauthorized or Server Error"
      );
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
                    type="file"
                    accept="image/*"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
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
          <label className="block font-semibold text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Lead Rope, Horse Halter"
            className="w-full mt-2 px-4 py-2.5 border rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-700">
            Product Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-2 px-4 py-2.5 border rounded-lg"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold text-gray-700">
            Select Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-2 px-4 py-2.5 border rounded-lg"
            required
          >
            <option value="">Choose Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.path}>
                {cat.path}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-4 py-2.5 border rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Offer Price"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            className="px-4 py-2.5 border rounded-lg"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

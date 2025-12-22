import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditProductForm = ({ product, isOpen, onClose, onSave, axios }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    offerPrice: "",
    image: []
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        offerPrice: product.offerPrice || "",
        image: product.image || []
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedImage = formData.image;

      // If new image selected, upload first
      if (imageFile) {
        const imgData = new FormData();
        imgData.append("image", imageFile);

        const uploadRes = await axios.post("/api/upload", imgData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (uploadRes.data.success) {
          const fileName = uploadRes.data.fileName;
          updatedImage = [fileName]; // image array
        } else {
          toast.error("Image upload failed");
          return;
        }
      }

      // Update product
      const { data } = await axios.put(`/api/product/${product._id}`, {
        name: formData.name,
        category: formData.category,
        offerPrice: formData.offerPrice,
        image: updatedImage
      });

      if (data.success) {
        toast.success("Product updated successfully");
        onSave();
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to update product");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <span>Product Name Update</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
            required
          />
          <span>Category Change</span>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-2 border rounded"
            required
          />
          <span>Price Update</span>

          <input
            type="number"
            name="offerPrice"
            value={formData.offerPrice}
            onChange={handleChange}
            placeholder="Selling Price"
            className="w-full p-2 border rounded"
            required
          />

          <div>


            {formData.image?.length > 0 && !imageFile && (
              <img
                src={`http://localhost:5000/images/${formData.image[0]}`}
                alt="Current"
                className="mt-2 h-20"
              />
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;

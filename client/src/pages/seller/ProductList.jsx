import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import EditProductForm from "../../pages/seller/EditProductForm";

const ProductList = () => {
  const { products, fetchProducts, axios } = useAppContext();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("https://shrishivay-4.onrender.com/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while updating stock.");
      console.error("Toggle Stock Error:", error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(`https://shrishivay-4.onrender.com/api/product/${id}`);
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting product.");
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">All Products</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 hidden md:table-cell">Price</th>
              <th className="px-6 py-4">In Stock</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={`https://shrishivay-4.onrender.com/api/images/${product.image[0]}`}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded border"
                  />
                  <span className="font-medium">{product.name}</span>
                </td>

                <td className="px-6 py-4">{product.category}</td>

                <td className="px-6 py-4 hidden md:table-cell">₹{product.offerPrice}</td>

                <td className="px-6 py-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={product.inStock}
                      onChange={() => toggleStock(product._id, !product.inStock)}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition duration-300 relative">
                      <div className="dot absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 peer-checked:translate-x-5" />
                    </div>
                  </label>
                </td>

                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        {editModalOpen && selectedProduct && (
          <EditProductForm
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            product={selectedProduct}
            onSave={fetchProducts}
            axios={axios}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;

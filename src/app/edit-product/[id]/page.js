import sqlite from "better-sqlite3";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const db = sqlite("products.sqlite");

const EditProduct = ({ params }) => {
  const product = db
    .prepare(`SELECT * FROM products WHERE id = ?`)
    .get(params.id); // Use `.get()` to get a single product object

  if (!product) {
    return <div className="text-center text-red-500">Product not found.</div>;
  }

  const handleSubmit = async (formData) => {
    "use server";

    const productId = params.id; // Get the product ID

    // Create an object with the updated product data
    const updatedProduct = {
      name: formData.get("productName"),
      description: formData.get("productDescription"),
      price: parseFloat(formData.get("productPrice")),
      image: formData.get("productImage")?.name || product.image, // Keep old image if not updated
    };

    // Prepare and execute the UPDATE query
    const updateStmt = db.prepare(
      `UPDATE products 
       SET name = ?, description = ?, price = ?, image = ? 
       WHERE id = ?`
    );

    updateStmt.run(
      updatedProduct.name,
      updatedProduct.description,
      updatedProduct.price,
      updatedProduct.image,
      productId
    );

    revalidatePath("/", "page");
    redirect("/"); // Redirect only after the update is successful
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Edit Product
        </h2>
        <form action={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              defaultValue={product.name}
              type="text"
              name="productName"
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Description
            </label>
            <textarea
              defaultValue={product.description}
              name="productDescription"
              rows="3"
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Product Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              defaultValue={product.price}
              type="number"
              name="productPrice"
              step="0.01"
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Product Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              name="productImage"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Current Image:{" "}
              <img src={product.image} alt="Current" width="50" />
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="mb-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Edit Product
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

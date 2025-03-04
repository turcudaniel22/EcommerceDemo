import getProducts from "../../database/products";
import ProductCard from "./components/ProductCard";

export default function Product() {
  const products = getProducts();
  console.log(products);

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

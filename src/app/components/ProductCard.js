"use client";
import React from "react";
import Image from "next/image";
import { deleteProduct } from "@/actions/productAction";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow p-4">
      {/* Image Container */}
      <div className="relative w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
        <Image
          layout="fill"
          objectFit="cover"
          alt={product.name}
          src={"/" + product.image}
          className="rounded-t-2xl"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 text-center">
        {/* Product Name */}
        <h1 className="text-md xs:text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
          {product.name}
        </h1>

        {/* Product Price */}
        <h2 className="text-sm xs:text-md sm:text-lg md:text-xl text-gray-600 font-medium mt-2">
          ${product.price}
        </h2>

        {/* Product Description */}
        <p className="text-xs xs:text-sm sm:text-md md:text-lg text-gray-500 mt-2">
          {product.description}
        </p>

        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition text-xs xs:text-sm sm:text-md md:text-lg">
          <Link href={"/edit-product/" + product.id}> edit</Link>
        </button>

        <button
          className=" ml-2 mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition text-xs xs:text-sm sm:text-md md:text-lg"
          onClick={() => deleteProduct(product.id)}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

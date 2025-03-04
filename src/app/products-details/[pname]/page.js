import React from "react";

const Products = ({ params }) => {
  console.log(params);
  return (
    <div>
      <h1> This is a {params.pname}</h1>
    </div>
  );
};

export default Products;

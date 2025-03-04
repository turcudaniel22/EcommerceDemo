import Link from "next/link";
import React from "react";
import HeaderStyles from "./header.module.css";

const header = () => {
  return (
    <div id={HeaderStyles.navbar}>
      <Link href="/">Products</Link>
      <Link href="/add-product">Add product</Link>
    </div>
  );
};

export default header;

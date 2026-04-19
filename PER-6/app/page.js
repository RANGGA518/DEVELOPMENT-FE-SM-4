"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {products.map((item, index) => (
            <div className="col-md-4" key={index}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
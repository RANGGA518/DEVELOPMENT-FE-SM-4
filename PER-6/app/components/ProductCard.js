"use client";

import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card p-3">
      <h5>{product.nama_produk}</h5>
      <p>Rp {product.harga}</p>
      <button 
        className="btn btn-primary"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
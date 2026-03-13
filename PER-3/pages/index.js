import Link from "next/link";
import { useState } from "react";

// DATA PRODUK
const products = [
  { id: 1, name: "Smartphone X1", price: 2500000, image: "/images/p1.jpg", sold: 122 },
  { id: 2, name: "Jaket Hoodie Premium", price: 150000, image: "/images/p2.jpg", sold: 321 },
  { id: 3, name: "Gaming Headset RGB", price: 300000, image: "/images/p3.jpg", sold: 54 },
  { id: 4, name: "Kacamata Anti Radiasi", price: 50000, image: "/images/p4.jpg", sold: 92 },
];

export default function HomePage() {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      {/* BANNER */}
      <div className="banner rounded shadow-sm mb-4"></div>

      {/* GRID PRODUK */}
      <div className="row">
        {filtered.map((p) => (
          <div key={p.id} className="col-6 col-md-3 mb-4">
            <div className="product-card shadow-sm">
              <img src={p.image} className="product-img" alt={p.name} />
              
              <div className="p-2">
                <h6 className="product-title">{p.name}</h6>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="product-price">Rp {p.price.toLocaleString()}</span>
                  <span className="text-muted small">{p.sold} terjual</span>
                </div>

                <Link
                  href={`/product/${p.id}`}
                  className="btn btn-orange w-100 mt-2"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
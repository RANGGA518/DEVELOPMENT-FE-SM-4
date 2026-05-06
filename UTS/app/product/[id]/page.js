"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Detail() {
  const params = useParams();
  const id = params.id;

  const [produk, setProduk] = useState(null);

  useEffect(() => {
    fetch("/api/produk")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.kode_barang == id);
        setProduk(found);
      });
  }, [id]);

  if (!produk) return <p>Loading...</p>;

  return (
    <div style={{ padding: 30 }}>
      
      <button onClick={() => history.back()}>
        ← Kembali
      </button>

      <div style={{ display: "flex", gap: 30, marginTop: 20 }}>

        {/* GAMBAR */}
        <img
          src={`/uploads/${produk.gambar}`}
          style={{
            width: 300,
            borderRadius: 12,
            objectFit: "cover",
          }}
        />

        {/* INFO */}
        <div>
          <h1>{produk.nama_barang}</h1>

          <h2 style={{ color: "#f97316" }}>
            Rp {Math.round(produk.harga).toLocaleString("id-ID")}
          </h2>

          <p>{produk.deskripsi}</p>

          <p>Stok: {produk.stok}</p>

          <button
            style={{
              marginTop: 10,
              padding: "10px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 8,
            }}
          >
            Beli Sekarang
          </button>
        </div>

      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  

  useEffect(() => {
    loadInitialData();
  }, []);

  // ================= INITIAL LOAD =================
  const loadInitialData = async () => {
    setLoading(true);
    await Promise.all([loadProducts(), loadCategories()]);
    setLoading(false);
  };

  // ================= GET PRODUCTS =================
  const loadProducts = async () => {
    try {
      const res = await fetch("/api/produk");
      const data = await res.json();

      setAllProducts(data);
      setProducts(data);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
  };

  // ================= GET CATEGORIES =================
  const loadCategories = async () => {
    try {
      const res = await fetch("/api/kategori");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
      setCategories([]);
    }
  };

  // ================= FILTER CATEGORY =================
  const filterCategory = (id, nama) => {
    setSelectedCategory(nama);

    const filtered = allProducts.filter(
      (p) => p.kategori_id === id
    );

    setProducts(filtered);
  };

  // ================= SEARCH =================
  const search = (value) => {
    setQuery(value);

    const filtered = allProducts.filter((p) =>
      p.nama_barang.toLowerCase().includes(value.toLowerCase())
    );

    setProducts(filtered);
    setSelectedCategory("Semua");
  };

  // ================= RESET =================
  const resetAll = () => {
    setProducts(allProducts);
    setSelectedCategory("Semua");
    setQuery("");
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.logo}>🛒 Mini Market</div>

        <input
          style={styles.navSearch}
          placeholder="Cari produk..."
          value={query}
          onChange={(e) => search(e.target.value)}
        />
      </div>

      {/* HERO */}
      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>Mini Market</h1>
        <p>Semua kebutuhan harian Anda</p>
      </div>

      {/* CATEGORY */}
      <h2 style={styles.sectionTitle}>
        Kategori : <span style={{ color: "#1e3a8a" }}>{selectedCategory}</span>
      </h2>

      <div style={styles.categoryGrid}>
        <div
          style={{
            ...styles.categoryCard,
            ...(selectedCategory === "Semua" && styles.activeCategory),
          }}
          onClick={resetAll}
        >
          Semua
        </div>

        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              ...styles.categoryCard,
              ...(selectedCategory === cat.nama_kategori &&
                styles.activeCategory),
            }}
            onClick={() => filterCategory(cat.id, cat.nama_kategori)}
          >
            {cat.nama_kategori}
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <h2 style={styles.sectionTitle}>Daftar Produk</h2>

      {loading ? (
        <p>Loading produk...</p>
      ) : products.length === 0 ? (
        <p>Tidak ada produk</p>
      ) : (
        <div style={styles.grid}>
          {products.map((p) => (
            <div
              key={p.kode_barang}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.06)";
              }}
              onClick={() => router.push(`/product/${p.kode_barang}`)}
            >
              {/* IMAGE */}
              <div style={styles.imageWrapper}>
                <img
                  src={`/uploads/${p.gambar}`}
                  style={styles.image}
                />

                {/* BADGE KATEGORI */}
                <div style={styles.badge}>
                  {p.nama_kategori || "Produk"}
                </div>
              </div>

              {/* CONTENT */}
              <div style={styles.cardBody}>
                <h3 style={styles.title}>{p.nama_barang}</h3>

                <p style={styles.price}>
                  Rp {Math.round(p.harga).toLocaleString("id-ID")}
                </p>

                <p style={styles.desc}>
                  {p.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
        )}
        <div style={styles.footer}>
  <div style={styles.footerContainer}>

    {/* BRAND */}
    <div>
      <h3 style={styles.footerTitle}>🛒 Mini Market</h3>
      <p style={styles.footerText}>
        Menyediakan kebutuhan harian dengan harga terbaik.
      </p>
    </div>

    {/* MENU */}
    <div>
      <h4 style={styles.footerSubtitle}>Menu</h4>
      <p style={styles.footerLink}>Home</p>
      <p style={styles.footerLink}>Kategori</p>
      <p style={styles.footerLink}>Produk</p>
    </div>

    {/* KONTAK */}
    <div>
      <h4 style={styles.footerSubtitle}>Kontak</h4>
      <p style={styles.footerText}>Email: minimarket@email.com</p>
      <p style={styles.footerText}>Telp: 0812-3456-7890</p>
    </div>

  </div>

  <div style={styles.footerBottom}>
    © {new Date().getFullYear()} Mini Market. All rights reserved.
  </div>
</div>
    </div>
  );
}

// ================= STYLE =================
const styles = {
  page: {
    fontFamily: "Arial",
    padding: 20,
    background: "#f5f6f8",
  },

  navbar: {
    display: "flex",
    gap: 15,
    background: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  logo: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#1e3a8a",
  },

  navSearch: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
    color:"#111"
  },

  banner: {
    background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
    color: "white",
    padding: 30,
    borderRadius: 15,
    marginBottom: 30,
  },

  bannerTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },

  sectionTitle: {
  margin: "25px 0",
  fontWeight: "bold",
  color: "#111",
},

  categoryGrid: {
  display: "flex",
  gap: 10,
  overflowX: "auto",
  paddingBottom: 10,
},

categoryCard: {
  padding: "10px 18px",
  borderRadius: 999,
  background: "#fff",
  cursor: "pointer",
  border: "1px solid #ddd",
  whiteSpace: "nowrap",
  transition: "0.2s",
  fontSize: 14,
  color: "#111"
},

activeCategory: {
  background: "#2563eb",
  color: "white",
  border: "1px solid #2563eb",
  fontWeight: "bold",
},

grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
  gap: 20,
},

card: {
  background: "white",
  borderRadius: 16,
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.25s ease",
  boxShadow: "0 6px 15px rgba(0,0,0,0.06)",
},

imageWrapper: {
  position: "relative",
  overflow: "hidden",
},

image: {
  width: "100%",
  height: 160,
  objectFit: "cover",
  transition: "0.4s",
},

badge: {
  position: "absolute",
  top: 10,
  left: 10,
  background: "rgba(0,0,0,0.7)",
  color: "white",
  padding: "4px 10px",
  fontSize: 11,
  borderRadius: 999,
},

cardBody: {
  padding: 14,
},

title: {
  fontSize: 15,
  fontWeight: "600",
  color: "#111",
  marginBottom: 6,

  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
},

price: {
  color: "#f97316",
  fontWeight: "bold",
  fontSize: 16,
  marginBottom: 6,
},

desc: {
  fontSize: 13,
  color: "#666",

  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
},
footer: {
  marginTop: 50,
  background: "#111",
  color: "white",
  padding: "40px 20px 20px",
  borderRadius: 12,
},

footerContainer: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: 30,
},

footerTitle: {
  marginBottom: 10,
},

footerSubtitle: {
  marginBottom: 10,
  fontSize: 16,
},

footerText: {
  fontSize: 14,
  color: "#ccc",
},

footerLink: {
  fontSize: 14,
  color: "#ccc",
  cursor: "pointer",
  marginBottom: 5,
},

footerBottom: {
  marginTop: 30,
  borderTop: "1px solid #333",
  paddingTop: 15,
  textAlign: "center",
  fontSize: 13,
  color: "#aaa",
},
};
async function getProducts() {
  const res = await fetch("http://localhost:3000/api/produk", {
    cache: "no-store"
  });
  const data = await res.json();
  return data;
}

export default async function Home() {
  const produk = await getProducts();
  
  function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID").format(angka);
}

  return (
    <main style={{ padding: "40px", fontFamily: "Arial", backgroundColor: 'darkblue' }}>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>
        🛒 STIKOM E-Commerce
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "30px"
        }}
      >
        {produk.map((prod) => (
          <div
            key={prod.kode_barang}
            style={{
              borderRadius: 15,
              overflow: "hidden",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}
          >
            <img
              src={`/images/${prod.gambar}`}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover"
              }}
            />
            <div
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                flexGrow: 1 
              }}
            >
              <h3>{prod.nama_barang}</h3>
              <p
                style={{
                  color: "#666",
                  fontSize: 14,
                  minHeight: 60 
                }}
              >
                {prod.deskripsi}
              </p>

              <h2 style={{ color: "#2ecc71", marginTop: "auto" }}>
                Rp {formatRupiah(prod.harga)}
              </h2>

              <button
                style={{
                  marginTop: 15,
                  padding: "10px",
                  borderRadius: 8,
                  border: "none",
                  background: "#3498db",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
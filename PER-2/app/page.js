async function getProduk() {
  const res = await fetch("http://localhost:3000/api/produk", {
    cache: "no-store"
  })
  return res.json()
}

export default async function Home() {
  const produk = await getProduk()

  return (
    <main>
      <h1>E-Commerce Dengan Next.js</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {produk.map(prod => (
          <div key={prod.id} style={{ border: "1px solid #ccc", padding: 20}}>
              <img src={`/images/${prod.gambar}`} width={150}/>
              <h3>{prod.nama_barang}</h3>
              <p>{prod.harga}</p>
              <p>{prod.deskripsi}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
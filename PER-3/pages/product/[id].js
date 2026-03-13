import { useRouter } from "next/router";
import { useCart } from "../../contexts/CartContext";

const db = {
  1: { id: 1, name: "Smartphone X1", price: 2500000, desc: "Smartphone generasi terbaru", image: "/images/p1.jpg" },
  2: { id: 2, name: "Jaket Hoodie Premium", price: 150000, desc: "Hoodie nyaman dan tebal", image: "/images/p2.jpg" },
  3: { id: 3, name: "Gaming Headset RGB", price: 300000, desc: "Suara jernih, bass mantap", image: "/images/p3.jpg" },
  4: { id: 4, name: "Kacamata Anti Radiasi", price: 50000, desc: "Aman untuk mata", image: "/images/p4.jpg" },
};

export default function Detail() {
  const { addToCart } = useCart();
  const { id } = useRouter().query;

  const p = db[id];
  if (!p) return <h1>Loading...</h1>;

  return (
    <div className="container mt-4">
      <div className="row">
        
        <div className="col-md-6">
          <img src={p.image} className="img-fluid rounded shadow" alt={p.name} />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold">{p.name}</h2>
          <h3 className="text-orange fw-bold">Rp {p.price.toLocaleString()}</h3>
          
          <p className="mt-3">{p.desc}</p>
          
          <button 
            className="btn btn-orange w-50 mt-3"
            onClick={() => addToCart(p)}
          >
            + Tambah ke Keranjang
          </button>
        </div>

      </div>
    </div>
  );
}
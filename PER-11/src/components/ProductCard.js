import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '260px', height: 'auto' }}
      />
      <h3>{product.name}</h3>
      <p>Rp {product.price.toLocaleString()}</p>
      <button onClick={() => addToCart(product)}>
        Tambah ke Keranjang
      </button>
    </div>
  );
};

export default ProductCard;
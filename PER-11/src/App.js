import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import products from './data/products';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="App">
      <Header />
      <ProductList
        products={products}
        addToCart={handleAddToCart}
      />
      <Cart cartItems={cart} />
      <Footer />
    </div>
  );
}

export default App;
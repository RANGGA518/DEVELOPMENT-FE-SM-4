"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <Link href="/" className="navbar-brand text-white">Home</Link>
      <Link href="/cart" className="text-white">Cart = {cart.length}</Link>
    </nav>
  );
}
import { useMemo, useState } from "react";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import CartDrawer from "./components/CartDrawer";
import ProductUploader from "./components/ProductUploader";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  async function checkout() {
    try {
      const payload = {
        items: cart.map((c) => ({ product_id: c.id, quantity: c.quantity }))
      };
      const res = await fetch(`${API}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Checkout failed");
      alert(`Order confirmed! ID: ${data.order_id}`);
      setCart([]);
      setCartOpen(false);
    } catch (e) {
      alert(e.message || "Checkout failed");
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/70 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif text-xl">Maison</div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
            <a href="#catalog" className="hover:text-slate-900 dark:hover:text-white">Women</a>
            <a href="#catalog" className="hover:text-slate-900 dark:hover:text-white">Men</a>
            <a href="#catalog" className="hover:text-slate-900 dark:hover:text-white">Home</a>
            <a href="#catalog" className="hover:text-slate-900 dark:hover:text-white">Gifts</a>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="rounded-full border px-4 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-900">Bag ({cart.reduce((a,c)=>a+c.quantity,0)})</button>
          </div>
        </div>
      </header>

      <main>
        <Hero onShop={() => document.getElementById("catalog")?.scrollIntoView({behavior:'smooth'})} />
        <Catalog onAdd={addToCart} />
        <ProductUploader onCreated={() => window.location.reload()} />
      </main>

      <footer className="py-16 text-center text-sm text-slate-500">© Maison — A demo luxury store experience</footer>

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onCheckout={checkout} />
    </div>
  );
}

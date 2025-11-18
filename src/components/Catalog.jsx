import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Catalog({ onAdd }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">Loading products…</div>
    );
  }

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white">Featured</h2>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />)
        )}
      </div>
      {products.length === 0 && (
        <p className="mt-6 text-slate-500">No products yet. Use the uploader below to add your first product.</p>
      )}
    </section>
  );
}

import { useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function ProductUploader({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: "",
    sku: "",
    stock_qty: 10,
    in_stock: true,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const payload = {
        title: form.title,
        description: form.description || undefined,
        price: parseFloat(form.price || "0"),
        category: form.category || undefined,
        images: (form.images || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        sku: form.sku || undefined,
        stock_qty: Number(form.stock_qty ?? 0),
        in_stock: !!form.in_stock,
      };

      const res = await fetch(`${API}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create product");
      const data = await res.json();
      setMessage("Product added ✨");
      setForm({ title: "", description: "", price: "", category: "", images: "", sku: "", stock_qty: 10, in_stock: true });
      onCreated?.(data);
    } catch (e) {
      console.error(e);
      setMessage("Could not add product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Add a product</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input className="rounded-lg border px-3 py-2" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} required />
          <input className="rounded-lg border px-3 py-2" placeholder="Price (e.g. 2499)" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} required />
          <input className="rounded-lg border px-3 py-2 md:col-span-2" placeholder="Image URLs (comma separated)" value={form.images} onChange={(e)=>setForm({...form, images:e.target.value})} />
          <input className="rounded-lg border px-3 py-2" placeholder="Category" value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})} />
          <input className="rounded-lg border px-3 py-2" placeholder="SKU (optional)" value={form.sku} onChange={(e)=>setForm({...form, sku:e.target.value})} />
          <input className="rounded-lg border px-3 py-2" type="number" min="0" placeholder="Stock qty" value={form.stock_qty} onChange={(e)=>setForm({...form, stock_qty:e.target.value})} />
          <textarea className="rounded-lg border px-3 py-2 md:col-span-2" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
          <div className="md:col-span-2 flex items-center gap-3">
            <input id="in_stock" type="checkbox" checked={form.in_stock} onChange={(e)=>setForm({...form, in_stock:e.target.checked})} />
            <label htmlFor="in_stock">In stock</label>
          </div>
          <div className="md:col-span-2 flex items-center gap-4">
            <button disabled={loading} className="rounded-full bg-black text-white px-6 py-2.5 disabled:opacity-50">
              {loading ? "Adding…" : "Add product"}
            </button>
            {message && <span className="text-sm text-slate-600">{message}</span>}
          </div>
        </form>
      </div>
    </section>
  );
}

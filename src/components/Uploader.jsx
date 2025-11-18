import { useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Uploader({ onCreated }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([""]);
  const [loading, setLoading] = useState(false);

  const addImageField = () => setImages((arr) => [...arr, ""]);
  const updateImage = (idx, val) => setImages((arr) => arr.map((v, i) => (i === idx ? val : v)));

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title,
        price: Number(price || 0),
        category,
        images: images.filter(Boolean),
        in_stock: true,
        stock_qty: 10
      };
      const res = await fetch(`${API}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        onCreated?.(data);
        setTitle("");
        setPrice("");
        setCategory("");
        setImages([""]);
      } else {
        alert(data.detail || "Failed to create product");
      }
    } catch (e) {
      console.error(e);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-14">
      <h3 className="text-xl font-semibold mb-6">Add a product</h3>
      <form onSubmit={submit} className="space-y-4">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title"
               className="w-full rounded-xl border border-slate-300 px-4 py-2" required />
        <div className="grid grid-cols-2 gap-4">
          <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" step="0.01" placeholder="Price"
                 className="w-full rounded-xl border border-slate-300 px-4 py-2" required />
          <input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Category"
                 className="w-full rounded-xl border border-slate-300 px-4 py-2" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-600">Image URLs</label>
          {images.map((val, idx) => (
            <input key={idx} value={val} onChange={(e)=>updateImage(idx, e.target.value)} placeholder={`https://...`}
                   className="w-full rounded-xl border border-slate-300 px-4 py-2" />
          ))}
          <button type="button" onClick={addImageField} className="text-sm text-black underline">Add another image</button>
        </div>
        <button disabled={loading} className="rounded-full bg-black text-white px-6 py-2">
          {loading ? "Saving…" : "Save product"}
        </button>
      </form>
    </section>
  );
}

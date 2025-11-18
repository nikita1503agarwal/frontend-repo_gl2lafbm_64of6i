import { motion } from "framer-motion";

export default function Hero({ onShop }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-slate-900 dark:text-white">
            Timeless craftsmanship for the modern wardrobe
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
            Discover leather goods, silk accessories, ready-to-wear, and shoes crafted with exceptional savoir‑faire.
          </p>
          <div className="mt-8 flex gap-4">
            <button onClick={onShop} className="px-6 py-3 rounded-full bg-black text-white hover:bg-slate-800 transition">
              Shop New Arrivals
            </button>
            <a href="#catalog" className="px-6 py-3 rounded-full border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Explore Catalog
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="aspect-[4/5] w-full rounded-3xl bg-[url('https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM0MTE5NzJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center shadow-2xl"
        />
      </div>
    </section>
  );
}

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100">
        <img
          src={product.images?.[0] || "https://placehold.co/600x800/png"}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium text-slate-900 dark:text-white">{product.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{product.category || "Accessory"}</p>
        </div>
        <p className="text-base font-semibold text-slate-900 dark:text-white">${Number(product.price).toFixed(2)}</p>
      </div>
      <button
        onClick={() => onAdd(product)}
        className="mt-3 w-full rounded-full bg-black text-white py-2.5 text-sm hover:bg-slate-800 transition"
      >
        Add to bag
      </button>
    </div>
  );
}

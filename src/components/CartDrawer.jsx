import { useMemo } from "react";

export default function CartDrawer({ open, items, onClose, onCheckout }) {
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-xl transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold">Your bag</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Close</button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
          {items.length === 0 && (
            <p className="text-slate-500">Your bag is empty.</p>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex gap-4">
              <img src={it.images?.[0]} alt={it.title} className="w-20 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <p className="font-medium">{it.title}</p>
                <p className="text-sm text-slate-500">Qty: {it.quantity}</p>
              </div>
              <p className="font-medium">${(it.price * it.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-600">Subtotal</p>
            <p className="text-lg font-semibold">${subtotal.toFixed(2)}</p>
          </div>
          <button onClick={onCheckout} className="w-full rounded-full bg-black text-white py-3 hover:bg-slate-800">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

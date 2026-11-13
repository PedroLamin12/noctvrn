import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

export type CartLine = { id: string; size: string; qty: number };
type CartCtx = {
  lines: (CartLine & { product: Product })[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string, size: string) => void;
  setQty: (id: string, size: string, qty: number) => void;
  remove: (id: string, size: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "noctvrn-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setRaw(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(KEY, JSON.stringify(raw)); }, [raw, ready]);

  const value = useMemo<CartCtx>(() => {
    const lines = raw.flatMap((l) => { const product = getProduct(l.id); return product ? [{ ...l, product }] : []; });
    return {
      lines, open, setOpen,
      count: lines.reduce((a, l) => a + l.qty, 0),
      subtotal: lines.reduce((a, l) => a + l.qty * l.product.price, 0),
      add: (id, size) => {
        setRaw((r) => {
          const f = r.find((l) => l.id === id && l.size === size);
          return f ? r.map((l) => (l === f ? { ...l, qty: l.qty + 1 } : l)) : [...r, { id, size, qty: 1 }];
        });
        setOpen(true);
      },
      setQty: (id, size, qty) => setRaw((r) => qty <= 0 ? r.filter((l) => !(l.id === id && l.size === size)) : r.map((l) => (l.id === id && l.size === size ? { ...l, qty } : l))),
      remove: (id, size) => setRaw((r) => r.filter((l) => !(l.id === id && l.size === size))),
    };
  }, [raw, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}

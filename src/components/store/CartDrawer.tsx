import { Minus, Plus, X } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

const FREE = 1500;

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, setQty, remove, count } = useCart();
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, setOpen]);
  const progress = Math.min(100, (subtotal / FREE) * 100);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${open ? "translate-x-0 shadow-drawer" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-display text-3xl">Sacola <sup className="font-mono text-xs">({count})</sup></h2>
          <button onClick={() => setOpen(false)} aria-label="Fechar"><X className="h-5 w-5" /></button>
        </div>
        <div className="border-b border-border px-6 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {subtotal >= FREE ? "Frete grátis desbloqueado ✦" : `Faltam ${formatPrice(FREE - subtotal)} para frete grátis`}
          </p>
          <div className="mt-2 h-px bg-border"><div className="h-px bg-accent transition-all duration-700" style={{ width: `${progress}%` }} /></div>
        </div>
        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="font-display text-4xl italic">Vazia, por enquanto.</p>
                <button onClick={() => setOpen(false)} className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] link-underline">Continuar explorando</button>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {lines.map((l) => (
                <li key={l.id + l.size} className="flex gap-4 py-5 animate-fade-up">
                  <img src={l.product.image} alt={l.product.name} className="h-32 w-24 bg-muted object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-medium">{l.product.name}</p>
                      <button onClick={() => remove(l.id, l.size)} aria-label="Remover" className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                    </div>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Tam. {l.size} · {l.product.colors[0]}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button className="p-2" onClick={() => setQty(l.id, l.size, l.qty - 1)} aria-label="Menos"><Minus className="h-3 w-3" /></button>
                        <span className="w-6 text-center font-mono text-xs">{l.qty}</span>
                        <button className="p-2" onClick={() => setQty(l.id, l.size, l.qty + 1)} aria-label="Mais"><Plus className="h-3 w-3" /></button>
                      </div>
                      <span className="font-mono text-sm">{formatPrice(l.qty * l.product.price)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-border p-6">
            <div className="flex justify-between font-mono text-sm uppercase tracking-[0.15em]"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <button onClick={() => toast("Projeto conceito — checkout demonstrativo ✦")} className="mt-4 w-full bg-foreground py-4 font-mono text-xs uppercase tracking-[0.3em] text-background transition-colors hover:bg-accent hover:text-accent-foreground">Finalizar compra</button>
          </div>
        )}
      </aside>
    </div>
  );
}

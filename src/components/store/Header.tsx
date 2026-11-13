import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count, setOpen } = useCart();
  return (
    <>
      <div className="bg-foreground text-background overflow-hidden whitespace-nowrap py-2 font-mono text-[10px] uppercase tracking-[0.3em]">
        <div className="animate-marquee inline-block">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>Frete grátis acima de R$ 1.500 &nbsp;✦&nbsp; Capítulo 07 já disponível &nbsp;✦&nbsp; Edições numeradas &nbsp;✦&nbsp; Trocas em 30 dias &nbsp;✦&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1600px] grid-cols-3 items-center px-5 py-4 md:px-10">
          <nav className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.2em]">
            <Link to="/shop" className="link-underline" activeProps={{ className: "text-accent" }}>Loja</Link>
            <Link to="/" hash="editorial" className="link-underline hidden md:inline">Editorial</Link>
          </nav>
          <Link to="/" className="justify-self-center font-display text-3xl tracking-tight md:text-4xl">NOCTVRN</Link>
          <button onClick={() => setOpen(true)} className="group flex items-center gap-2 justify-self-end font-mono text-[11px] uppercase tracking-[0.2em]" aria-label="Abrir sacola">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Sacola</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] text-accent-foreground">{count}</span>
          </button>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
        <p className="font-display text-[18vw] leading-[0.8] tracking-tighter md:text-[14vw]">NOCTVRN</p>
        <div className="mt-10 flex flex-col justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row">
          <span>© 2026 Noctvrn Studio — Projeto conceito</span>
          <span>São Paulo · Milão · Tóquio</span>
        </div>
      </div>
    </footer>
  );
}

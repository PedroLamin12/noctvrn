import { Link } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count, setOpen } = useCart();
  return (
    <>
      <div className="bg-foreground text-background overflow-hidden whitespace-nowrap py-2 font-mono font-semibold text-[10px] uppercase tracking-[0.14em]">
        <div className="animate-marquee inline-block">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>Frete grátis acima de R$ 1.500 &nbsp;✦&nbsp; Capítulo 07 já disponível &nbsp;✦&nbsp; Edições numeradas &nbsp;✦&nbsp; Trocas em 30 dias &nbsp;✦&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center gap-6 px-5 py-4 md:px-10">
          <Link to="/" className="font-display text-3xl tracking-tight md:text-4xl">NOCTVRN</Link>
          <div className="hidden flex-1 items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 text-sm text-muted-foreground md:flex">
            <Search className="h-4 w-4" /><input placeholder="Buscar peças, marcas e coleções" className="w-full bg-transparent outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <button aria-label="Conta" className="hidden rounded-full p-2.5 transition-colors hover:bg-secondary sm:block"><User className="h-5 w-5" /></button>
            <button aria-label="Favoritos" className="hidden rounded-full p-2.5 transition-colors hover:bg-secondary sm:block"><Heart className="h-5 w-5" /></button>
            <button onClick={() => setOpen(true)} aria-label="Abrir sacola" className="relative rounded-full bg-foreground px-4 py-2.5 text-background transition-colors hover:bg-accent">
              <span className="flex items-center gap-2 text-sm font-semibold"><ShoppingBag className="h-4 w-4" />{count}</span>
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-[1600px] gap-7 overflow-x-auto px-5 pb-3 text-sm font-medium md:px-10">
          <Link to="/shop" className="link-underline whitespace-nowrap" activeProps={{ className: "text-accent" }}>Novidades</Link>
          {["Feminino", "Masculino", "Outerwear", "Tênis", "Acessórios"].map((c) => (
            <Link key={c} to="/shop" className="link-underline whitespace-nowrap">{c}</Link>
          ))}
          <Link to="/" hash="editorial" className="link-underline whitespace-nowrap">Editorial</Link>
          <Link to="/shop" className="whitespace-nowrap font-semibold text-accent">Sale até 40%</Link>
        </nav>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
        <p className="font-display text-[18vw] leading-[0.8] tracking-tighter md:text-[14vw]">NOCTVRN</p>
        <div className="mt-10 flex flex-col justify-between gap-4 font-mono font-semibold text-[11px] uppercase tracking-[0.1em] text-muted-foreground md:flex-row">
          <span>© 2026 Noctvrn Studio — Projeto conceito</span>
          <span>São Paulo · Milão · Tóquio</span>
        </div>
      </div>
    </footer>
  );
}

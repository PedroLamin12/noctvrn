import hoodie from "@/assets/p-hoodie.jpg";
import cargo from "@/assets/p-cargo.jpg";
import sneaker from "@/assets/p-sneaker.jpg";
import coat from "@/assets/p-coat.jpg";
import tee from "@/assets/p-tee.jpg";
import bag from "@/assets/p-bag.jpg";
import puffer from "@/assets/p-puffer.jpg";
import jacket from "@/assets/p-jacket.jpg";
import denim from "@/assets/p-denim.jpg";
import boot from "@/assets/p-boot.jpg";
import beanie from "@/assets/p-beanie.jpg";

export type Category = "Outerwear" | "Tops" | "Bottoms" | "Footwear" | "Acessórios";

export type Product = {
  id: string;
  name: string;
  line: string;
  category: Category;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  tag?: "Novo" | "Edição limitada" | "Esgotando";
  description: string;
  details: string[];
};

export const products: Product[] = [
  { id: "void-hoodie", name: "Void Heavyweight Hoodie", line: "Capítulo 07", category: "Tops", price: 1890, image: hoodie, colors: ["Preto"], sizes: ["P", "M", "G", "GG"], tag: "Novo", description: "Moletom de 520 g/m² em algodão escovado, modelagem boxy com ombro caído e capuz de dupla camada.", details: ["100% algodão orgânico", "Tingimento em peça", "Feito em Portugal"] },
  { id: "dune-cargo", name: "Dune Wide Cargo", line: "Capítulo 07", category: "Bottoms", price: 2290, image: cargo, colors: ["Areia"], sizes: ["38", "40", "42", "44"], description: "Calça cargo de perna larga em sarja pesada, pregas frontais e bolsos utilitários com fole.", details: ["Sarja 14oz", "Cintura com regulagem interna", "Lavagem enzimática"] },
  { id: "orbit-runner", name: "Orbit Runner 01", line: "Footwear Lab", category: "Footwear", price: 3490, image: sneaker, colors: ["Branco", "Cinza"], sizes: ["39", "40", "41", "42", "43"], tag: "Edição limitada", description: "Tênis chunky com cabedal em mesh técnico, sobreposições em camurça e solado escultural multicamada.", details: ["Camurça italiana", "Solado EVA injetado", "Numerado — 300 pares"] },
  { id: "atelier-coat", name: "Atelier Wool Coat", line: "Atelier", category: "Outerwear", price: 6890, image: coat, colors: ["Marfim"], sizes: ["P", "M", "G"], tag: "Esgotando", description: "Sobretudo oversized em lã double-face feito à mão, lapela ampla e acabamento sem forro.", details: ["90% lã, 10% cashmere", "Costura à mão", "Feito na Itália"] },
  { id: "relic-tee", name: "Relic Washed Tee", line: "Capítulo 07", category: "Tops", price: 790, image: tee, colors: ["Grafite"], sizes: ["P", "M", "G", "GG"], description: "Camiseta oversized em jersey 280 g/m² com lavagem stone e estampa serigráfica craquelada.", details: ["100% algodão", "Estampa à base d'água", "Gola canelada reforçada"] },
  { id: "halo-bag", name: "Halo Crossbody", line: "Atelier", category: "Acessórios", price: 4290, image: bag, colors: ["Preto"], sizes: ["Único"], tag: "Novo", description: "Bolsa transversal em couro de bezerro liso, fecho em metal escovado e alça regulável.", details: ["Couro de bezerro", "Metais em paládio", "Forro em camurça"] },
  { id: "eclipse-vest", name: "Eclipse Down Vest", line: "Footwear Lab", category: "Outerwear", price: 3190, image: puffer, colors: ["Preto"], sizes: ["P", "M", "G", "GG"], description: "Colete acolchoado em nylon ripstop com enchimento de pluma responsável e gola alta.", details: ["Pluma RDS 90/10", "Nylon repelente à água", "Zíperes YKK Excella"] },
  { id: "void-hoodie-bone", name: "Void Hoodie — Bone Dye", line: "Capítulo 07", category: "Tops", price: 1990, image: hoodie, colors: ["Preto"], sizes: ["M", "G"], tag: "Edição limitada", description: "Versão numerada do Void Hoodie com tingimento mineral e bordado tonal no capuz.", details: ["Edição de 150 peças", "Tingimento mineral", "Feito em Portugal"] },
  { id: "nocturne-biker", name: "Nocturne Biker Jacket", line: "Atelier", category: "Outerwear", price: 7490, image: jacket, colors: ["Preto"], sizes: ["P", "M", "G", "GG"], tag: "Novo", description: "Jaqueta biker oversized em couro de cordeiro encerado, zíper assimétrico e ombros amplos.", details: ["Couro de cordeiro", "Metais em níquel escovado", "Feito na Itália"] },
  { id: "shadow-denim", name: "Shadow Wide Denim", line: "Capítulo 07", category: "Bottoms", price: 1690, image: denim, colors: ["Preto lavado"], sizes: ["38", "40", "42", "44", "46"], description: "Jeans de perna larga em denim japonês 13,5oz com lavagem preta desbotada.", details: ["Denim selvedge japonês", "Botões em latão", "Lavagem artesanal"] },
  { id: "rampart-boot", name: "Rampart Combat Boot", line: "Footwear Lab", category: "Footwear", price: 3990, image: boot, colors: ["Preto"], sizes: ["37", "38", "39", "40", "41", "42", "43"], tag: "Esgotando", description: "Coturno em couro polido com solado tratorado elevado e zíper lateral.", details: ["Couro de bezerro polido", "Solado de borracha vulcanizada", "Palmilha em couro"] },
  { id: "drift-knit-set", name: "Drift Cashmere Set", line: "Atelier", category: "Acessórios", price: 2490, image: beanie, colors: ["Cinza mescla"], sizes: ["Único"], tag: "Novo", description: "Conjunto de gorro canelado e cachecol com franjas em cashmere mongol.", details: ["100% cashmere", "Tricô em máquina retilínea", "Feito na Escócia"] },
  { id: "relic-tee-bone", name: "Relic Tee — Bone", line: "Capítulo 07", category: "Tops", price: 690, image: tee, colors: ["Osso"], sizes: ["P", "M", "G", "GG"], description: "A Relic Tee em tom osso, lavagem enzimática suave e estampa tonal.", details: ["100% algodão", "Pré-encolhida", "Feita no Brasil"] },
  { id: "dune-cargo-black", name: "Dune Cargo — Onyx", line: "Capítulo 07", category: "Bottoms", price: 2290, image: cargo, colors: ["Preto"], sizes: ["38", "40", "42"], tag: "Edição limitada", description: "A Dune Cargo em sarja preta com costuras contrastantes e fivelas em metal.", details: ["Sarja 14oz", "Edição de 200 peças", "Lavagem enzimática"] },
  { id: "orbit-runner-mono", name: "Orbit Runner 01 — Mono", line: "Footwear Lab", category: "Footwear", price: 3490, image: sneaker, colors: ["Branco"], sizes: ["38", "39", "40", "41", "42"], description: "Versão monocromática do Orbit Runner com cabedal em mesh e couro branco.", details: ["Couro nappa", "Solado EVA injetado", "Cadarço extra incluso"] },
  { id: "eclipse-puffer-long", name: "Eclipse Long Puffer", line: "Footwear Lab", category: "Outerwear", price: 4890, image: puffer, colors: ["Preto"], sizes: ["P", "M", "G"], description: "Parka acolchoada longa com capuz removível e enchimento de pluma responsável.", details: ["Pluma RDS 90/10", "Resistente a −15 °C", "Zíper bidirecional"] },
  { id: "halo-mini", name: "Halo Mini Bag", line: "Atelier", category: "Acessórios", price: 2990, image: bag, colors: ["Preto"], sizes: ["Único"], description: "A Halo em versão compacta, com alça curta de ombro e corrente removível.", details: ["Couro de bezerro", "Corrente em paládio", "Cabe um smartphone"] },
];

export const categories: Category[] = ["Outerwear", "Tops", "Bottoms", "Footwear", "Acessórios"];

export const formatPrice = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const getProduct = (id: string) => products.find((p) => p.id === id);

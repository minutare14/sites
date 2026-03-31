import Image from "next/image";
import Link from "next/link";
import EditorialShell from "@/components/EditorialShell";
import { formatCurrency } from "@/lib/format";
import type {
  SaleorCollection,
  StorefrontProduct,
} from "@/lib/saleor/types";

type HeroProps = {
  products: StorefrontProduct[];
  collections: SaleorCollection[];
};

function ProductMiniCard({ product }: { product: StorefrontProduct }) {
  return (
    <Link
      href={`/colecao/${product.slug}`}
      className="group editorial-card overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_48px_-30px_rgba(37,22,14,0.45)]"
    >
      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-brand-surface-high">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail.url}
            alt={product.thumbnail.alt || product.name}
            fill
            unoptimized
            sizes="(min-width: 1024px) 18vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-brand-muted">
            Sem imagem
          </div>
        )}
      </div>
      <div className="space-y-2">
        <p className="eyebrow">
          {product.collections[0]?.name || product.category?.name || "Momo & Cia"}
        </p>
        <div className="flex items-start justify-between gap-4">
          <h3 className="max-w-[14rem] text-xl leading-tight">{product.name}</h3>
          <span className="shrink-0 text-sm font-medium uppercase tracking-[0.14em] text-brand-ink/70">
            {formatCurrency(product.price.amount, product.price.currency)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Hero({ products, collections }: HeroProps) {
  const [featured, secondary, tertiary] = products;
  const accentCollections = collections.slice(0, 3);

  if (!featured) {
    return (
      <EditorialShell>
        <section className="editorial-section text-center">
          <p className="eyebrow">Curadoria MOMO &amp; CIA</p>
          <h1 className="mt-6 text-5xl md:text-7xl">
            O novo editorial da loja ja esta pronto.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
            Assim que o Saleor publicar produtos no canal atual, esta vitrine
            passa a ocupar o hero automaticamente.
          </p>
        </section>
      </EditorialShell>
    );
  }

  return (
    <EditorialShell>
      <section className="overflow-hidden">
        <div className="grid min-h-[44rem] grid-cols-1 lg:grid-cols-[1.45fr_1fr]">
          <div className="relative min-h-[28rem] bg-brand-surface-highest">
            {featured.thumbnail ? (
              <Image
                src={featured.thumbnail.url}
                alt={featured.thumbnail.alt || featured.name}
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-linear-to-r from-brand-background-veil/72 via-brand-background-veil/28 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-8 md:p-12 lg:p-16">
              <div className="max-w-xl space-y-6">
                <p className="eyebrow text-white/75">
                  {featured.collections[0]?.name ||
                    collections[0]?.name ||
                    "Colecao principal"}
                </p>
                <h1 className="max-w-lg text-6xl leading-[0.9] text-white md:text-8xl">
                  Curadoria para um inverno de presenca silenciosa.
                </h1>
                <p className="max-w-md text-lg leading-relaxed text-white/76 md:text-xl">
                  O storefront continua conectado ao Saleor, mas agora assume a
                  linguagem de um editorial de moda: tipografia imponente,
                  fotografia central e pecas reais compondo a narrativa.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/colecao" className="btn-primary">
                  Explorar colecao
                </Link>
                <Link
                  href={`/colecao/${featured.slug}`}
                  className="btn-secondary border-white/20 bg-white/16 text-white hover:bg-white/24"
                >
                  Ver peca em foco
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-brand-surface-low">
            <div className="editorial-section pb-8">
              <p className="eyebrow">The digital curator</p>
              <h2 className="mt-5 max-w-sm text-5xl leading-[0.95] md:text-6xl">
                O catalogo real agora guia o layout.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-brand-muted">
                Nada aqui e mock de frontend. Nome, preco, imagem, colecao e
                slug seguem vindo do Saleor, enquanto a composicao foi alinhada
                ao Stitch e ao PRD editorial.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {accentCollections.map((collection) => (
                  <span key={collection.id} className="editorial-chip">
                    {collection.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-px bg-brand-outline/18 p-px md:grid-cols-2">
              {secondary ? <ProductMiniCard product={secondary} /> : <div />}
              {tertiary ? <ProductMiniCard product={tertiary} /> : <div />}
            </div>
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}

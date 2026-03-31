import Image from "next/image";
import Link from "next/link";
import EditorialShell from "@/components/EditorialShell";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { formatCurrency } from "@/lib/format";
import { getCollections, getProducts } from "@/lib/saleor/client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getProducts({ first: 8 }),
    getCollections({ first: 4 }),
  ]);

  const featuredProducts = products.slice(0, 6);
  const spotlightProduct = products[6] || products[0] || null;

  return (
    <div className="flex flex-col gap-10">
      <Hero products={products.slice(0, 3)} collections={collections} />

      <EditorialShell>
        <section className="editorial-section">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Catalogo conectado</p>
              <h2 className="mt-4 text-4xl md:text-6xl">
                Produtos reais ocupando a vitrine principal.
              </h2>
            </div>
            <Link href="/colecao" className="editorial-link">
              Ver colecao completa
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </EditorialShell>

      <EditorialShell>
        <section className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="editorial-section bg-brand-surface-low">
            <p className="eyebrow">Brand chapter</p>
            <h2 className="mt-5 max-w-md text-4xl leading-tight md:text-6xl">
              Uma loja pensada como uma revista de moda viva.
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-brand-muted">
              <p>
                O redesign trouxe o que o PRD pedia: container flutuante,
                composicoes assimetricas, tipografia editorial e fotografias com
                mais protagonismo.
              </p>
              <p>
                Ao mesmo tempo, a loja continua ancorada no Saleor real, sem
                duplicar endpoint, sem mock de produto e sem criar uma camada
                paralela de dados.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {collections.map((collection, index) => (
                <div key={collection.id} className="editorial-card p-6">
                  <p className="eyebrow">{`Chapter 0${index + 1}`}</p>
                  <h3 className="mt-3 text-2xl">{collection.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-brand-muted">
                    {collection.description ||
                      "Selecao editorial criada para vestir com leveza, estrutura e permanencia."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="editorial-section relative bg-brand-surface-highest">
            {spotlightProduct?.thumbnail ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Image
                  src={spotlightProduct.thumbnail.url}
                  alt={spotlightProduct.thumbnail.alt || spotlightProduct.name}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center rounded-[2rem] bg-brand-surface-low text-xs uppercase tracking-[0.3em] text-brand-muted">
                Imagem em destaque
              </div>
            )}

            {spotlightProduct ? (
              <div className="editorial-card relative -mt-20 ml-auto max-w-sm p-6 md:p-8">
                <p className="eyebrow">
                  {spotlightProduct.category?.name || "Look selecionado"}
                </p>
                <h3 className="mt-3 text-3xl leading-tight">
                  {spotlightProduct.name}
                </h3>
                <p className="mt-4 text-base leading-7 text-brand-muted">
                  {spotlightProduct.description}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand-ink/72">
                    {formatCurrency(
                      spotlightProduct.price.amount,
                      spotlightProduct.price.currency,
                    )}
                  </span>
                  <Link
                    href={`/colecao/${spotlightProduct.slug}`}
                    className="editorial-link"
                  >
                    Ver produto
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </EditorialShell>

      <EditorialShell className="bg-brand-accent text-brand-surface">
        <section className="editorial-section">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="eyebrow text-white/60">Editorial commerce</p>
              <h2 className="mt-5 max-w-3xl text-5xl leading-[0.95] text-brand-surface md:text-7xl">
                Toda a linguagem visual nova,
                <br />
                com o catalogo autentico da marca.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-white/72">
              <p>
                A home agora distingue claramente conteudo editorial fixo e
                catalogo dinamico. O texto contextualiza a marca; os produtos,
                imagens e precos continuam vindo do Saleor.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/colecao"
                  className="btn-primary bg-brand-surface text-brand-accent hover:bg-brand-surface-high"
                >
                  Shop the collection
                </Link>
                <Link
                  href="/sobre"
                  className="btn-secondary border-white/15 bg-white/8 text-white hover:bg-white/14"
                >
                  Nossa historia
                </Link>
              </div>
            </div>
          </div>
        </section>
      </EditorialShell>
    </div>
  );
}

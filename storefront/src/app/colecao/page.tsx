import Image from "next/image";
import Link from "next/link";
import EditorialShell from "@/components/EditorialShell";
import ProductCard from "@/components/ProductCard";
import { getCollections, getProducts } from "@/lib/saleor/client";

export const dynamic = "force-dynamic";

export default async function CollectionPage() {
  const [products, collections] = await Promise.all([
    getProducts({ first: 24 }),
    getCollections({ first: 6 }),
  ]);

  const coverProduct = products[0] || null;

  return (
    <div className="space-y-10">
      <EditorialShell>
        <section className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="editorial-section bg-brand-surface-low">
            <p className="eyebrow">Full collection</p>
            <h1 className="mt-5 max-w-lg text-5xl leading-[0.95] md:text-7xl">
              O catalogo vivo da Momo &amp; Cia em linguagem editorial.
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-brand-muted">
              Esta pagina continua usando os produtos publicados no canal do
              Saleor. O redesign so reorganiza a experiencia visual, sem
              duplicar API, sem mockar card e sem quebrar slug ou preco real.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {collections.map((collection) => (
                <span key={collection.id} className="editorial-chip">
                  {collection.name}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-8 text-sm uppercase tracking-[0.22em] text-brand-muted">
              <span>{products.length} pecas publicadas</span>
              <span>{collections.length} narrativas editoriais</span>
              <span>Canal ativo: momo-br</span>
            </div>
          </div>

          <div className="relative min-h-[24rem] bg-brand-surface-highest">
            {coverProduct?.thumbnail ? (
              <Image
                src={coverProduct.thumbnail.url}
                alt={coverProduct.thumbnail.alt || coverProduct.name}
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-linear-to-t from-brand-background-veil/60 via-transparent to-transparent" />
            {coverProduct ? (
              <div className="absolute right-6 bottom-6 max-w-xs rounded-[1.75rem] bg-white/86 p-6 backdrop-blur md:right-10 md:bottom-10">
                <p className="eyebrow">
                  {coverProduct.collections[0]?.name ||
                    coverProduct.category?.name ||
                    "Look em foco"}
                </p>
                <h2 className="mt-3 text-3xl">{coverProduct.name}</h2>
                <Link
                  href={`/colecao/${coverProduct.slug}`}
                  className="editorial-link mt-5 inline-flex"
                >
                  Abrir produto
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      </EditorialShell>

      <EditorialShell>
        <section className="editorial-section">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!products.length ? (
            <p className="mt-10 text-sm text-brand-muted">
              Nenhum produto publicado foi encontrado no canal atual da loja.
            </p>
          ) : null}
        </section>
      </EditorialShell>
    </div>
  );
}

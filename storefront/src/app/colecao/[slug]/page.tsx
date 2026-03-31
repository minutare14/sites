import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialShell from "@/components/EditorialShell";
import ProductCard from "@/components/ProductCard";
import { formatCurrency } from "@/lib/format";
import { getProductBySlug, getProducts } from "@/lib/saleor/client";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, recommendations] = await Promise.all([
    getProductBySlug(slug),
    getProducts({ first: 6 }),
  ]);

  if (!product) {
    notFound();
  }

  const gallery = product.media.length
    ? product.media
    : product.thumbnail
      ? [product.thumbnail]
      : [];
  const relatedProducts = recommendations
    .filter((candidate) => candidate.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="space-y-10">
      <EditorialShell>
        <section className="editorial-section">
          <div className="mb-8 text-sm uppercase tracking-[0.2em] text-brand-muted">
            <Link href="/colecao" className="transition hover:text-brand-accent">
              Colecao
            </Link>{" "}
            / {product.name}
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-surface-low md:row-span-2">
                {gallery[0] ? (
                  <Image
                    src={gallery[0].url}
                    alt={gallery[0].alt || product.name}
                    fill
                    priority
                    unoptimized
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-brand-muted">
                    Sem imagem
                  </div>
                )}
              </div>

              {gallery.slice(1, 3).map((media, index) => (
                <div
                  key={`${media.url}-${index}`}
                  className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-surface-high"
                >
                  <Image
                    src={media.url}
                    alt={media.alt || product.name}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 22vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="eyebrow">
                {product.category?.name || "Moda feminina"}
              </p>
              <h1 className="mt-4 text-4xl leading-tight md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-5 text-3xl font-medium text-brand-accent">
                {formatCurrency(product.price.amount, product.price.currency)}
              </p>

              <p className="mt-8 text-lg leading-relaxed text-brand-muted">
                {product.description}
              </p>

              {product.collections.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {product.collections.map((collection) => (
                    <span key={collection.id} className="editorial-chip">
                      {collection.name}
                    </span>
                  ))}
                </div>
              ) : null}

              {product.variants.length ? (
                <div className="editorial-card mt-10 space-y-4 p-6">
                  <h2 className="text-lg">Variantes disponiveis</h2>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                      <span
                        key={variant.id}
                        className="rounded-full bg-white px-4 py-2 text-sm text-brand-muted"
                      >
                        {variant.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/5511999999999?text=${encodeURIComponent(`Oi! Tenho interesse em ${product.name}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Comprar pelo WhatsApp
                </a>
                <Link href="/colecao" className="btn-secondary">
                  Voltar ao catalogo
                </Link>
              </div>

              <div className="mt-10 space-y-4">
                <details className="editorial-card p-6" open>
                  <summary className="cursor-pointer text-sm font-medium uppercase tracking-[0.18em] text-brand-ink/75">
                    Details
                  </summary>
                  <p className="mt-4 text-base leading-7 text-brand-muted">
                    Peca cadastrada no Saleor com slug, preco, imagens e
                    variacoes reais, pronta para continuar sendo editada no
                    dashboard.
                  </p>
                </details>
                <details className="editorial-card p-6">
                  <summary className="cursor-pointer text-sm font-medium uppercase tracking-[0.18em] text-brand-ink/75">
                    Materials
                  </summary>
                  <p className="mt-4 text-base leading-7 text-brand-muted">
                    A composicao especifica ainda pode ser enriquecida no Saleor.
                    No storefront, mantivemos uma apresentacao editorial limpa
                    enquanto o catalogo continua soberano.
                  </p>
                </details>
                <details className="editorial-card p-6">
                  <summary className="cursor-pointer text-sm font-medium uppercase tracking-[0.18em] text-brand-ink/75">
                    Shipping
                  </summary>
                  <p className="mt-4 text-base leading-7 text-brand-muted">
                    Use o WhatsApp para atendimento concierge ou finalize a
                    configuracao de checkout do projeto em uma etapa futura.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </EditorialShell>

      {relatedProducts.length ? (
        <EditorialShell>
          <section className="editorial-section">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Complete the look</p>
                <h2 className="mt-4 text-4xl md:text-5xl">
                  Outras pecas do catalogo real.
                </h2>
              </div>
              <Link href="/colecao" className="editorial-link">
                Ver todos os produtos
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        </EditorialShell>
      ) : null}
    </div>
  );
}

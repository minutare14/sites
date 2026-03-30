import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/format";
import { getProductBySlug } from "@/lib/saleor/client";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const gallery = product.media.length
    ? product.media
    : product.thumbnail
      ? [product.thumbnail]
      : [];

  return (
    <section className="section-padding bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="mb-8 text-sm uppercase tracking-[0.2em] text-brand-text/45">
          <Link href="/colecao" className="hover:text-brand-terracotta">
            Colecao
          </Link>{" "}
          / {product.name}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {gallery.map((media, index) => (
              <div
                key={`${media.url}-${index}`}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-brand-outline/10 bg-white"
              >
                <Image
                  src={media.url}
                  alt={media.alt || product.name}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-navy">
              {product.category?.name || "Moda feminina"}
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl">{product.name}</h1>
            <p className="mt-5 text-3xl font-bold text-brand-terracotta">
              {formatCurrency(product.price.amount, product.price.currency)}
            </p>

            <p className="mt-8 text-lg leading-relaxed text-brand-text/78">
              {product.description}
            </p>

            {product.collections.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {product.collections.map((collection) => (
                  <span
                    key={collection.id}
                    className="rounded-full border border-brand-outline/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-navy"
                  >
                    {collection.name}
                  </span>
                ))}
              </div>
            ) : null}

            {product.variants.length ? (
              <div className="mt-10 space-y-4 rounded-3xl border border-brand-outline/10 bg-white/70 p-6">
                <h2 className="text-lg font-serif text-brand-terracotta">
                  Variantes disponiveis
                </h2>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <span
                      key={variant.id}
                      className="rounded-full border border-brand-outline/20 px-4 py-2 text-sm text-brand-text/75"
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
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getCollections, getProducts } from "@/lib/saleor/client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getProducts({ first: 4 }),
    getCollections({ first: 3 }),
  ]);

  return (
    <div className="flex flex-col">
      <Hero />

      <section className="section-padding bg-brand-cream-dark/20 font-sans">
        <div className="container mx-auto px-6">
          <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h4 className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-navy">
                Catalogo real
              </h4>
              <h2 className="text-4xl font-serif md:text-5xl">
                Colecao em destaque
              </h2>
            </div>
            <Link
              href="/colecao"
              className="border-b-2 border-brand-terracotta pb-1 text-sm font-bold text-brand-terracotta transition-opacity hover:opacity-70"
            >
              Ver todos os produtos
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding font-sans">
        <div className="container mx-auto grid grid-cols-1 items-center gap-20 px-6 md:grid-cols-2">
          <div className="order-2 relative p-12 md:order-1">
            <div className="absolute top-0 right-0 h-full w-full -rotate-3 rounded-3xl bg-brand-terracotta/5" />
            <div className="relative rounded-2xl border border-brand-outline/10 bg-brand-cream-dark p-10 shadow-2xl">
              <h4 className="mb-6 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-navy">
                Curadoria da marca
              </h4>
              <div className="space-y-4">
                {collections.map((collection) => (
                  <div
                    key={collection.id}
                    className="rounded-2xl border border-brand-outline/10 bg-white/70 p-5"
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-terracotta">
                      {collection.name}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-brand-text/75">
                      {collection.description ||
                        "Edicao pensada para mulheres que querem se reencontrar na moda com leveza e autenticidade."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h4 className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-navy">
              Nossa essencia
            </h4>
            <h2 className="mb-8 text-4xl leading-tight md:text-5xl">
              Moda feminina com poucas pecas, muita presenca e elegancia sem
              excesso.
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-brand-text/80">
              <p>
                A Momo &amp; Cia nasceu em Sao Paulo com o proposito de
                transformar o vestir em um gesto de autoestima, autenticidade e
                reencontro.
              </p>
              <p>
                O catalogo e vivo, editavel no admin e organizado para a loja
                parecer real em cada vitrine, pagina de produto e navegacao.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/sobre" className="btn-secondary">
                Conheca nosso proposito
              </Link>
              <Link href="/contato" className="btn-primary">
                Falar no WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-navy font-sans text-center text-brand-cream">
        <div className="container mx-auto px-6">
          <h2 className="mb-8 text-4xl text-brand-cream md:text-6xl">
            Pronta para se <br />
            <span className="italic">reencontrar?</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed opacity-80">
            Explore pecas desenhadas para elevar sua autoestima, com imagens,
            precos e variacoes vindos do Saleor de verdade.
          </p>
          <Link
            href="/colecao"
            className="btn-primary inline-flex bg-brand-cream text-brand-navy hover:bg-brand-cream/90"
          >
            Ver colecao completa
          </Link>
        </div>
      </section>
    </div>
  );
}

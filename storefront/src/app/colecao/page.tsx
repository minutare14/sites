import ProductCard from "@/components/ProductCard";
import { getCollections, getProducts } from "@/lib/saleor/client";

export const dynamic = "force-dynamic";

export default async function CollectionPage() {
  const [products, collections] = await Promise.all([
    getProducts({ first: 24 }),
    getCollections({ first: 6 }),
  ]);

  return (
    <section className="section-padding bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <h4 className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-navy">
            Colecao completa
          </h4>
          <h1 className="text-5xl md:text-6xl">Catalogo real da Momo &amp; Cia</h1>
          <p className="mt-6 text-lg leading-relaxed text-brand-text/75">
            Produtos, imagens, preco em real, slug e organizacao editorial
            vindos do catalogo conectado da loja.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-3">
          {collections.map((collection) => (
            <span
              key={collection.id}
              className="rounded-full border border-brand-outline/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-navy"
            >
              {collection.name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!products.length ? (
          <p className="mt-10 text-sm text-brand-text/70">
            Nenhum produto publicado foi encontrado no canal atual da loja.
          </p>
        ) : null}
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import type { StorefrontProduct } from "@/lib/saleor/types";

type ProductCardProps = {
  product: StorefrontProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/colecao/${product.slug}`} className="group block">
      <div className="relative mb-5 aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-brand-surface-high">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail.url}
            alt={product.thumbnail.alt || product.name}
            fill
            unoptimized
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-brand-surface-high to-brand-surface-highest px-6 text-center text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brand-muted">
            Imagem em curadoria
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-brand-ink/20 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 rounded-full bg-brand-surface/88 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-brand-ink opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
          Ver peca
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-brand-muted">
            {product.collections[0]?.name || product.category?.name || "Curadoria"}
          </p>
          <h3 className="text-2xl font-serif transition-colors group-hover:text-brand-accent">
            {product.name}
          </h3>
        </div>
        <p className="pt-1 text-sm font-medium uppercase tracking-[0.14em] text-brand-ink/75">
          {formatCurrency(product.price.amount, product.price.currency)}
        </p>
      </div>
      <p className="mt-3 max-w-xs text-sm leading-6 text-brand-muted">
        {product.description}
      </p>
    </Link>
  );
}

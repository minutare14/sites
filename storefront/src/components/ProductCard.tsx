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
      <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-lg border border-brand-outline/5 bg-white shadow-sm transition-all group-hover:-translate-y-1 group-hover:shadow-xl">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail.url}
            alt={product.thumbnail.alt || product.name}
            fill
            unoptimized
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-terracotta/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/25 via-transparent to-transparent opacity-70" />
      </div>

      <h3 className="mb-1 text-lg font-serif transition-colors group-hover:text-brand-terracotta">
        {product.name}
      </h3>
      <p className="font-bold text-brand-navy">
        {formatCurrency(product.price.amount, product.price.currency)}
      </p>
      <p className="mt-1 text-[0.6rem] uppercase tracking-widest text-brand-text/40">
        {product.category?.name || "Colecao Momo & Cia"}
      </p>
    </Link>
  );
}

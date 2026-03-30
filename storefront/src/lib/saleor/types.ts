export type Money = {
  amount: number;
  currency: string;
};

export type SaleorMedia = {
  url: string;
  alt: string | null;
};

export type SaleorCategory = {
  id: string;
  name: string;
  slug: string;
};

export type SaleorCollection = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type StorefrontProductVariant = {
  id: string;
  name: string;
};

export type StorefrontProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: SaleorCategory | null;
  collections: SaleorCollection[];
  media: SaleorMedia[];
  thumbnail: SaleorMedia | null;
  price: Money;
  variants: StorefrontProductVariant[];
};

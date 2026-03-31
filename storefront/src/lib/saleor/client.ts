import {
  COLLECTIONS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCTS_QUERY,
} from "@/lib/saleor/queries";
import type {
  SaleorCollection,
  StorefrontProduct,
} from "@/lib/saleor/types";

const saleorApiUrl =
  process.env.SALEOR_API_URL || "http://localhost:8100/graphql/";
const channel =
  process.env.SALEOR_CHANNEL_SLUG ||
  process.env.DEFAULT_CHANNEL_SLUG ||
  "momo-br";
const saleorMediaBaseUrl =
  process.env.SALEOR_MEDIA_BASE_URL ||
  process.env.BACKEND_PUBLIC_URL ||
  "http://localhost:8100/";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function saleorFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Saleor request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as GraphQLResponse<T>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  if (!payload.data) {
    throw new Error("Saleor response did not include data.");
  }

  return payload.data;
}

function normalizeDescription(description: unknown): string {
  if (!description) {
    return "Peca selecionada para a curadoria inicial da Momo & Cia.";
  }

  if (typeof description === "string") {
    const trimmed = description.trim();

    if (trimmed.startsWith("{")) {
      try {
        return normalizeDescription(JSON.parse(trimmed));
      } catch {
        return trimmed.replace(/<[^>]+>/g, "").trim();
      }
    }

    return trimmed.replace(/<[^>]+>/g, "").trim();
  }

  if (typeof description === "object" && description !== null) {
    const blocks = "blocks" in description ? (description as { blocks?: unknown[] }).blocks : [];

    if (Array.isArray(blocks)) {
      const text = blocks
        .map((block) => {
          if (
            typeof block === "object" &&
            block !== null &&
            "data" in block &&
            typeof (block as { data?: unknown }).data === "object" &&
            (block as { data?: { text?: string } }).data?.text
          ) {
            return (block as { data?: { text?: string } }).data?.text;
          }

          return "";
        })
        .filter(Boolean)
        .join(" ");

      if (text) {
        return text.replace(/<[^>]+>/g, "").trim();
      }
    }

    return JSON.stringify(description);
  }

  return String(description);
}

function normalizeMediaBaseUrl(url: string) {
  return url.endsWith("/") ? url : `${url}/`;
}

function normalizeMediaUrl(url: string) {
  if (!url) {
    return url;
  }

  const baseUrl = normalizeMediaBaseUrl(saleorMediaBaseUrl);

  if (url.startsWith("/")) {
    return new URL(url, baseUrl).toString();
  }

  return url
    .replace("http://saleor-api:8000/", baseUrl)
    .replace("http://backend/", baseUrl)
    .replace("http://localhost:8000/", baseUrl)
    .replace("http://127.0.0.1:8000/", baseUrl)
    .replace("http://localhost:8100/", baseUrl)
    .replace("http://127.0.0.1:8100/", baseUrl);
}

function mapProduct(node: {
  id: string;
  name: string;
  slug: string;
  description: unknown;
  category: { id: string; name: string; slug: string } | null;
  collections?: SaleorCollection[] | null;
  thumbnail?: {
    url: string;
    alt: string | null;
  } | null;
  media?: {
    url: string;
    alt: string | null;
  }[] | null;
  pricing?: {
    priceRange?: {
      start?: {
        gross?: {
          amount: number;
          currency: string;
        } | null;
      } | null;
    } | null;
  } | null;
  productVariants?: {
    edges?: {
      node: {
        id: string;
        name: string;
      };
    }[];
  } | null;
}): StorefrontProduct {
  const media = node.media || [];
  const normalizedMedia = media.map((item) => ({
    ...item,
    url: normalizeMediaUrl(item.url),
  }));
  const normalizedThumbnail = node.thumbnail
    ? {
        ...node.thumbnail,
        url: normalizeMediaUrl(node.thumbnail.url),
      }
    : null;
  const price =
    node.pricing?.priceRange?.start?.gross ||
    ({
      amount: 0,
      currency: "BRL",
    } as const);

  return {
    id: node.id,
    name: node.name,
    slug: node.slug,
    description: normalizeDescription(node.description),
    category: node.category,
    collections:
      node.collections?.map((collection) => ({
        ...collection,
        description: normalizeDescription(collection.description),
      })) || [],
    media:
      normalizedMedia.length || !normalizedThumbnail
        ? normalizedMedia
        : [normalizedThumbnail],
    thumbnail: normalizedThumbnail || normalizedMedia[0] || null,
    price,
    variants: node.productVariants?.edges?.map((edge) => edge.node) || [],
  };
}

export async function getProducts({ first = 12 }: { first?: number } = {}) {
  const data = await saleorFetch<{
    products: {
      edges: {
        node: Parameters<typeof mapProduct>[0];
      }[];
    };
  }>(PRODUCTS_QUERY, {
    channel,
    first,
  });

  return data.products.edges.map((edge) => mapProduct(edge.node));
}

export async function getProductBySlug(slug: string) {
  const data = await saleorFetch<{
    product: Parameters<typeof mapProduct>[0] | null;
  }>(PRODUCT_BY_SLUG_QUERY, {
    channel,
    slug,
  });

  return data.product ? mapProduct(data.product) : null;
}

export async function getCollections({ first = 6 }: { first?: number } = {}) {
  const data = await saleorFetch<{
    collections: {
      edges: {
        node: SaleorCollection;
      }[];
    };
  }>(COLLECTIONS_QUERY, {
    channel,
    first,
  });

  return data.collections.edges.map((edge) => ({
    ...edge.node,
    description: normalizeDescription(edge.node.description),
  }));
}

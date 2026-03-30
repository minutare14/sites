import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutputPath = path.join(rootDir, "data", "medusa-products.export.json");
const medusaUrl = process.env.MEDUSA_URL;
const medusaPublishableKey = process.env.MEDUSA_PUBLISHABLE_KEY;
const outputPath = path.resolve(
  process.env.MEDUSA_EXPORT_OUTPUT || defaultOutputPath,
);

function normalizeImage(image, fallbackAlt) {
  if (!image) {
    return null;
  }

  if (typeof image === "string") {
    return {
      url: image,
      alt: fallbackAlt,
    };
  }

  if (typeof image === "object" && "url" in image && image.url) {
    return {
      url: image.url,
      alt: image.alt || fallbackAlt,
    };
  }

  return null;
}

function normalizeCollection(collection) {
  if (!collection) {
    return null;
  }

  if (typeof collection === "string") {
    return {
      title: collection,
      handle: collection.toLowerCase().replace(/\s+/g, "-"),
    };
  }

  return {
    title: collection.title || collection.name || "Colecao",
    handle:
      collection.handle ||
      collection.slug ||
      String(collection.title || collection.name || "colecao")
        .toLowerCase()
        .replace(/\s+/g, "-"),
  };
}

function normalizeCategories(categories) {
  if (!Array.isArray(categories)) {
    return [];
  }

  return categories
    .map((category) => {
      if (typeof category === "string") {
        return {
          name: category,
          handle: category.toLowerCase().replace(/\s+/g, "-"),
        };
      }

      if (category && typeof category === "object") {
        return {
          name: category.name || category.title || "Categoria",
          handle:
            category.handle ||
            category.slug ||
            String(category.name || category.title || "categoria")
              .toLowerCase()
              .replace(/\s+/g, "-"),
        };
      }

      return null;
    })
    .filter(Boolean);
}

function normalizeOptions(product) {
  if (!Array.isArray(product.options)) {
    return [];
  }

  return product.options.map((option) => ({
    title: option.title || option.name || "Opcao",
    values:
      option.values?.map((value) =>
        typeof value === "string" ? value : value?.value || value?.title,
      ) || [],
  }));
}

function normalizeVariants(product) {
  if (!Array.isArray(product.variants)) {
    return [];
  }

  return product.variants.map((variant) => {
    const options = {};

    if (variant.options && typeof variant.options === "object") {
      for (const [key, value] of Object.entries(variant.options)) {
        options[key] =
          typeof value === "string" ? value : value?.value || value?.title || "";
      }
    } else if (Array.isArray(variant.options)) {
      for (const option of variant.options) {
        if (!option) {
          continue;
        }

        const title = option.option?.title || option.title || option.name;
        const value = option.value || option.option_value || option.title;

        if (title && value) {
          options[title] = value;
        }
      }
    }

    const prices =
      variant.prices?.map((price) => ({
        currency_code:
          price.currency_code || price.currencyCode || price.currency || "brl",
        amount:
          Number(price.amount ?? price.calculated_amount ?? price.value ?? 0) || 0,
      })) || [];

    return {
      id:
        variant.id ||
        variant.sku ||
        `variant-${Math.random().toString(36).slice(2, 10)}`,
      title: variant.title || variant.name || variant.sku || "Variante",
      sku: variant.sku || variant.id,
      prices,
      options,
    };
  });
}

function normalizeProducts(products) {
  return products.map((product) => {
    const images = Array.isArray(product.images)
      ? product.images
          .map((image) => normalizeImage(image, product.title || product.name))
          .filter(Boolean)
      : [];

    const thumbnail =
      normalizeImage(product.thumbnail, product.title || product.name)?.url ||
      images[0]?.url ||
      "";

    return {
      id: product.id,
      title: product.title || product.name,
      description: product.description || "",
      handle: product.handle || product.slug,
      status: product.status || "published",
      thumbnail,
      images,
      collection: normalizeCollection(
        product.collection || product.collections?.[0] || null,
      ),
      categories: normalizeCategories(product.categories || product.category || []),
      options: normalizeOptions(product),
      variants: normalizeVariants(product),
    };
  });
}

async function fetchFromMedusaApi() {
  if (!medusaUrl) {
    throw new Error("MEDUSA_URL is required for API extraction.");
  }

  const endpoint = new URL("/store/products", medusaUrl);
  endpoint.searchParams.set("limit", "100");

  const response = await fetch(endpoint, {
    headers: {
      ...(medusaPublishableKey
        ? {
            "x-publishable-api-key": medusaPublishableKey,
          }
        : {}),
    },
  });

  if (!response.ok) {
    throw new Error(
      `Medusa export failed with status ${response.status} at ${endpoint.toString()}.`,
    );
  }

  const payload = await response.json();
  const rawProducts =
    payload.products || payload.data?.products || payload.data || [];

  if (!Array.isArray(rawProducts)) {
    throw new Error("Medusa export did not return an array of products.");
  }

  return {
    sourceSystem: "medusa",
    currency: "brl",
    exportedAt: new Date().toISOString(),
    products: normalizeProducts(rawProducts),
  };
}

async function main() {
  let exportData;

  if (medusaUrl) {
    exportData = await fetchFromMedusaApi();
  } else {
    exportData = JSON.parse(await readFile(defaultOutputPath, "utf8"));
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(exportData, null, 2));

  console.log(
    JSON.stringify(
      {
        outputPath,
        productCount: exportData.products?.length || 0,
        mode: medusaUrl ? "api" : "snapshot",
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

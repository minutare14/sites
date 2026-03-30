import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const exportFilePath = path.resolve(
  process.env.MEDUSA_EXPORT_FILE ||
    path.join(rootDir, "data", "medusa-products.export.json"),
);

const saleorApiUrl =
  process.env.SALEOR_API_URL || "http://localhost:8100/graphql/";
const saleorChannelSlug = process.env.SALEOR_CHANNEL_SLUG || "momo-br";
const saleorAdminEmail =
  process.env.SALEOR_ADMIN_EMAIL || "emanoelmcedo@gmail.com";
const saleorAdminPassword =
  process.env.SALEOR_ADMIN_PASSWORD || "asd14200";

function createEditorJs(text) {
  return JSON.stringify({
    time: Date.now(),
    blocks: [
      {
        id: `block-${Math.random().toString(36).slice(2, 8)}`,
        type: "paragraph",
        data: {
          text,
        },
      },
    ],
    version: "2.28.2",
  });
}

function centsToDecimal(amount) {
  return Number((amount / 100).toFixed(2));
}

async function graphqlRequest(query, variables = {}, token) {
  const response = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token
        ? {
            authorization: `Bearer ${token}`,
          }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Saleor request failed with status ${response.status}.`);
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  return payload.data;
}

async function graphqlMultipartRequest(query, variables, fileVariablePath, file, token) {
  const form = new FormData();

  form.append(
    "operations",
    JSON.stringify({
      query,
      variables,
    }),
  );
  form.append(
    "map",
    JSON.stringify({
      "0": [fileVariablePath],
    }),
  );
  form.append("0", file);

  const response = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      ...(token
        ? {
            authorization: `Bearer ${token}`,
          }
        : {}),
    },
    body: form,
  });

  if (!response.ok) {
    throw new Error(
      `Saleor multipart request failed with status ${response.status}.`,
    );
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  return payload.data;
}

function assertNoErrors(result, key) {
  const errors = result?.[key]?.errors || result?.[key]?.productErrors || [];

  if (errors.length) {
    throw new Error(
      `${key} failed: ${errors
        .map((error) => `${error.field || "general"} ${error.code || ""} ${error.message || ""}`.trim())
        .join(" | ")}`,
    );
  }
}

async function getAdminToken() {
  const data = await graphqlRequest(
    `
      mutation TokenCreate($email: String!, $password: String!) {
        tokenCreate(email: $email, password: $password) {
          token
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      email: saleorAdminEmail,
      password: saleorAdminPassword,
    },
  );

  assertNoErrors(data, "tokenCreate");

  if (!data.tokenCreate.token) {
    throw new Error("Saleor admin token could not be created.");
  }

  return data.tokenCreate.token;
}

async function getState(token) {
  const data = await graphqlRequest(
    `
      query MigrationState {
        channels {
          id
          slug
          name
          currencyCode
        }
        productTypes(first: 20) {
          edges {
            node {
              id
              slug
              name
              hasVariants
            }
          }
        }
        attributes(first: 20) {
          edges {
            node {
              id
              slug
              name
              choices(first: 50) {
                edges {
                  node {
                    id
                    slug
                    name
                  }
                }
              }
            }
          }
        }
        categories(first: 100) {
          edges {
            node {
              id
              slug
              name
            }
          }
        }
        collections(first: 100) {
          edges {
            node {
              id
              slug
              name
            }
          }
        }
      }
    `,
    {},
    token,
  );

  return {
    channels: data.channels,
    productTypes: data.productTypes.edges.map((edge) => edge.node),
    attributes: data.attributes.edges.map((edge) => edge.node),
    categories: data.categories.edges.map((edge) => edge.node),
    collections: data.collections.edges.map((edge) => edge.node),
  };
}

async function ensureChannel(token, state) {
  const existing = state.channels.find(
    (channel) => channel.slug === saleorChannelSlug,
  );

  if (existing) {
    return existing;
  }

  const data = await graphqlRequest(
    `
      mutation ChannelCreate($input: ChannelCreateInput!) {
        channelCreate(input: $input) {
          channel {
            id
            slug
            name
            currencyCode
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      input: {
        name: "Momo Brasil",
        slug: saleorChannelSlug,
        currencyCode: "BRL",
        defaultCountry: "BR",
        isActive: true,
      },
    },
    token,
  );

  assertNoErrors(data, "channelCreate");
  state.channels.push(data.channelCreate.channel);
  return data.channelCreate.channel;
}

async function ensureAttribute(token, state, definition) {
  const existing = state.attributes.find(
    (attribute) => attribute.slug === definition.slug,
  );

  if (existing) {
    return existing;
  }

  const data = await graphqlRequest(
    `
      mutation AttributeCreate($input: AttributeCreateInput!) {
        attributeCreate(input: $input) {
          attribute {
            id
            slug
            name
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      input: {
        name: definition.name,
        slug: definition.slug,
        type: "PRODUCT_TYPE",
        inputType: "DROPDOWN",
        entityType: "PRODUCT_VARIANT",
        values: definition.values.map((value) => ({
          name: value,
          externalReference: `${definition.slug}-${value.toLowerCase().replace(/\s+/g, "-")}`,
        })),
        valueRequired: true,
        isVariantOnly: true,
        visibleInStorefront: true,
        filterableInStorefront: true,
      },
    },
    token,
  );

  assertNoErrors(data, "attributeCreate");

  const nextState = await getState(token);
  state.attributes = nextState.attributes;

  return state.attributes.find((attribute) => attribute.slug === definition.slug);
}

async function ensureProductType(token, state, variantAttributes) {
  const existing = state.productTypes.find(
    (productType) => productType.slug === "moda-feminina",
  );

  if (existing) {
    return existing;
  }

  const data = await graphqlRequest(
    `
      mutation ProductTypeCreate($input: ProductTypeInput!) {
        productTypeCreate(input: $input) {
          productType {
            id
            slug
            name
            hasVariants
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      input: {
        name: "Moda Feminina",
        slug: "moda-feminina",
        kind: "NORMAL",
        hasVariants: true,
        isShippingRequired: true,
        isDigital: false,
        variantAttributes: variantAttributes.map((attribute) => attribute.id),
      },
    },
    token,
  );

  assertNoErrors(data, "productTypeCreate");
  state.productTypes.push(data.productTypeCreate.productType);
  return data.productTypeCreate.productType;
}

async function ensureCategory(token, state, category) {
  const existing = state.categories.find(
    (current) => current.slug === category.handle,
  );

  if (existing) {
    return existing;
  }

  const data = await graphqlRequest(
    `
      mutation CategoryCreate($input: CategoryInput!) {
        categoryCreate(input: $input) {
          category {
            id
            slug
            name
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      input: {
        name: category.name,
        slug: category.handle,
      },
    },
    token,
  );

  assertNoErrors(data, "categoryCreate");
  state.categories.push(data.categoryCreate.category);
  return data.categoryCreate.category;
}

async function ensureCollection(token, state, channel, collection) {
  let existing = state.collections.find(
    (current) => current.slug === collection.handle,
  );

  if (!existing) {
    const data = await graphqlRequest(
      `
        mutation CollectionCreate($input: CollectionCreateInput!) {
          collectionCreate(input: $input) {
            collection {
              id
              slug
              name
            }
            errors {
              field
              message
              code
            }
          }
        }
      `,
      {
        input: {
          name: collection.title,
          slug: collection.handle,
          isPublished: true,
        },
      },
      token,
    );

    assertNoErrors(data, "collectionCreate");
    existing = data.collectionCreate.collection;
    state.collections.push(existing);
  }

  const publishData = await graphqlRequest(
    `
      mutation CollectionChannelListingUpdate(
        $id: ID!
        $input: CollectionChannelListingUpdateInput!
      ) {
        collectionChannelListingUpdate(id: $id, input: $input) {
          collection {
            id
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      id: existing.id,
      input: {
        addChannels: [
          {
            channelId: channel.id,
            isPublished: true,
          },
        ],
      },
    },
    token,
  );

  assertNoErrors(publishData, "collectionChannelListingUpdate");
  return existing;
}

async function findExistingProduct(token, sourceProduct) {
  const data = await graphqlRequest(
    `
      query ExistingProduct(
        $externalReference: String!
        $slug: String!
        $channel: String!
      ) {
        byExternalReference: product(externalReference: $externalReference) {
          id
          slug
        }
        bySlug: product(slug: $slug, channel: $channel) {
          id
          slug
        }
      }
    `,
    {
      externalReference: sourceProduct.id,
      slug: sourceProduct.handle,
      channel: saleorChannelSlug,
    },
    token,
  );

  return data.byExternalReference || data.bySlug || null;
}

async function deleteProductIfExists(token, sourceProduct) {
  const existing = await findExistingProduct(token, sourceProduct);

  if (!existing) {
    return false;
  }

  const data = await graphqlRequest(
    `
      mutation ProductDelete($id: ID!) {
        productDelete(id: $id) {
          product {
            id
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      id: existing.id,
    },
    token,
  );

  assertNoErrors(data, "productDelete");
  return true;
}

async function deleteCollectionBySlug(token, slug) {
  const data = await graphqlRequest(
    `
      query CleanupCollection($slug: String!) {
        collection(slug: $slug) {
          id
          slug
        }
      }
    `,
    {
      slug,
    },
    token,
  );

  if (!data.collection) {
    return;
  }

  const deletion = await graphqlRequest(
    `
      mutation CollectionDelete($id: ID!) {
        collectionDelete(id: $id) {
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      id: data.collection.id,
    },
    token,
  );

  assertNoErrors(deletion, "collectionDelete");
}

async function deleteCategoryBySlug(token, slug) {
  const data = await graphqlRequest(
    `
      query CleanupCategories($search: String!) {
        categories(first: 50, filter: { search: $search }) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `,
    {
      search: slug,
    },
    token,
  );

  const category = data.categories.edges.find((edge) => edge.node.slug === slug)?.node;

  if (!category) {
    return;
  }

  const deletion = await graphqlRequest(
    `
      mutation CategoryDelete($id: ID!) {
        categoryDelete(id: $id) {
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      id: category.id,
    },
    token,
  );

  assertNoErrors(deletion, "categoryDelete");
}

async function cleanupArtifacts(token) {
  await deleteProductIfExists(token, {
    id: "medusa_test_prod",
    handle: "produto-teste-saleor",
  });
  await deleteCollectionBySlug(token, "teste-colecao");
  await deleteCategoryBySlug(token, "teste-categoria");
}

async function createProduct(token, input) {
  const data = await graphqlRequest(
    `
      mutation ProductCreate($input: ProductCreateInput!) {
        productCreate(input: $input) {
          product {
            id
            slug
            name
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      input,
    },
    token,
  );

  assertNoErrors(data, "productCreate");
  return data.productCreate.product;
}

async function createVariant(token, input) {
  const data = await graphqlRequest(
    `
      mutation ProductVariantCreate($input: ProductVariantCreateInput!) {
        productVariantCreate(input: $input) {
          productVariant {
            id
            name
            sku
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      input,
    },
    token,
  );

  assertNoErrors(data, "productVariantCreate");
  return data.productVariantCreate.productVariant;
}

async function publishProduct(token, channel, productId, variantIds) {
  const data = await graphqlRequest(
    `
      mutation ProductChannelListingUpdate(
        $id: ID!
        $input: ProductChannelListingUpdateInput!
      ) {
        productChannelListingUpdate(id: $id, input: $input) {
          product {
            id
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      id: productId,
      input: {
        updateChannels: [
          {
            channelId: channel.id,
            isPublished: true,
            visibleInListings: true,
            isAvailableForPurchase: true,
            addVariants: variantIds,
          },
        ],
      },
    },
    token,
  );

  assertNoErrors(data, "productChannelListingUpdate");
}

async function setVariantPricing(token, channel, variantId, amount) {
  const data = await graphqlRequest(
    `
      mutation ProductVariantChannelListingUpdate(
        $id: ID!
        $input: [ProductVariantChannelListingAddInput!]!
      ) {
        productVariantChannelListingUpdate(id: $id, input: $input) {
          variant {
            id
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      id: variantId,
      input: [
        {
          channelId: channel.id,
          price: centsToDecimal(amount),
        },
      ],
    },
    token,
  );

  assertNoErrors(data, "productVariantChannelListingUpdate");
}

async function createMedia(token, productId, media) {
  const imageResponse = await fetch(media.url);

  if (!imageResponse.ok) {
    throw new Error(
      `Image download failed with status ${imageResponse.status} for ${media.url}.`,
    );
  }

  const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
  const imageBuffer = await imageResponse.arrayBuffer();
  const rawFileName =
    new URL(media.url).pathname.split("/").pop()?.split("?")[0] || "product";
  const extensionMap = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
  };
  const extension = extensionMap[contentType] || ".jpg";
  const fileName = rawFileName.includes(".")
    ? rawFileName
    : `${rawFileName}${extension}`;
  const uploadFile = new File([imageBuffer], fileName, {
    type: contentType,
  });

  const data = await graphqlMultipartRequest(
    `
      mutation ProductMediaCreate($input: ProductMediaCreateInput!) {
        productMediaCreate(input: $input) {
          media {
            id
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    {
      input: {
        product: productId,
        alt: media.alt,
        image: null,
      },
    },
    "variables.input.image",
    uploadFile,
    token,
  );

  assertNoErrors(data, "productMediaCreate");
}

function getVariantAttributePayload(product, variant, attributeMap) {
  const sizeTitle =
    product.options.find((option) => option.title === "Tamanho")?.title || "Tamanho";
  const colorTitle =
    product.options.find((option) => option.title === "Cor")?.title || "Cor";

  return [
    {
      id: attributeMap.get("tamanho").id,
      dropdown: {
        value: variant.options[sizeTitle],
      },
    },
    {
      id: attributeMap.get("cor").id,
      dropdown: {
        value: variant.options[colorTitle],
      },
    },
  ];
}

function buildSourceCollections(products, collections = []) {
  const collectionMap = new Map(
    collections.map((collection) => [collection.handle, collection]),
  );

  for (const product of products) {
    if (product.collection && !collectionMap.has(product.collection.handle)) {
      collectionMap.set(product.collection.handle, {
        title: product.collection.title,
        handle: product.collection.handle,
        description:
          "Colecao migrada do catalogo Medusa para manter a vitrine viva no Saleor.",
      });
    }
  }

  return [...collectionMap.values()];
}

function buildSourceCategories(products, categories = []) {
  const categoryMap = new Map(
    categories.map((category) => [category.handle, category]),
  );

  for (const product of products) {
    for (const category of product.categories || []) {
      if (!categoryMap.has(category.handle)) {
        categoryMap.set(category.handle, {
          name: category.name,
          handle: category.handle,
          description:
            "Categoria migrada do catalogo Medusa para estruturar a navegacao da loja.",
        });
      }
    }
  }

  return [...categoryMap.values()];
}

async function main() {
  const source = JSON.parse(await readFile(exportFilePath, "utf8"));
  const token = await getAdminToken();

  await cleanupArtifacts(token);

  const state = await getState(token);
  const channel = await ensureChannel(token, state);

  const attributeDefinitions = [
    {
      name: "Tamanho",
      slug: "tamanho",
      values: ["P", "M", "G"],
    },
    {
      name: "Cor",
      slug: "cor",
      values: [
        "Terracota",
        "Off White",
        "Marinho",
        "Creme",
        "Areia",
        "Champagne",
      ],
    },
  ];

  const attributes = [];
  for (const definition of attributeDefinitions) {
    attributes.push(await ensureAttribute(token, state, definition));
  }

  const attributeMap = new Map(
    attributes.map((attribute) => [attribute.slug, attribute]),
  );

  const productType = await ensureProductType(token, state, attributes);
  const categories = buildSourceCategories(source.products, source.categories);
  const collections = buildSourceCollections(source.products, source.collections);

  const categoryMap = new Map();
  for (const category of categories) {
    const created = await ensureCategory(token, state, category);
    categoryMap.set(category.handle, created);
  }

  const collectionMap = new Map();
  for (const collection of collections) {
    const created = await ensureCollection(token, state, channel, collection);
    collectionMap.set(collection.handle, created);
  }

  let importedCount = 0;

  for (const product of source.products) {
    await deleteProductIfExists(token, product);

    const category = categoryMap.get(product.categories[0]?.handle);
    const collection = collectionMap.get(product.collection?.handle);

    const createdProduct = await createProduct(token, {
      name: product.title,
      slug: product.handle,
      description: createEditorJs(product.description),
      category: category?.id || null,
      collections: collection ? [collection.id] : [],
      productType: productType.id,
      externalReference: product.id,
    });

    const createdVariants = [];

    for (const variant of product.variants) {
      const createdVariant = await createVariant(token, {
        product: createdProduct.id,
        sku: variant.sku,
        name: variant.title,
        trackInventory: false,
        externalReference: variant.id,
        attributes: getVariantAttributePayload(product, variant, attributeMap),
      });

      createdVariants.push({
        id: createdVariant.id,
        price:
          variant.prices.find(
            (entry) => entry.currency_code.toLowerCase() === "brl",
          ) || null,
      });
    }

    await publishProduct(
      token,
      channel,
      createdProduct.id,
      createdVariants.map((variant) => variant.id),
    );

    for (const createdVariant of createdVariants) {
      if (createdVariant.price) {
        await setVariantPricing(
          token,
          channel,
          createdVariant.id,
          createdVariant.price.amount,
        );
      }
    }

    for (const media of product.images) {
      await createMedia(token, createdProduct.id, media);
    }

    importedCount += 1;
  }

  console.log(
    JSON.stringify(
      {
        exportFilePath,
        channel: {
          slug: channel.slug,
          currencyCode: channel.currencyCode,
        },
        productType: productType.slug,
        importedCount,
        categoryCount: categoryMap.size,
        collectionCount: collectionMap.size,
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

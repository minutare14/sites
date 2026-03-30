export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($channel: String!, $first: Int!) {
    products(channel: $channel, first: $first) {
      edges {
        node {
          id
          name
          slug
          description
          category {
            id
            name
            slug
          }
          collections {
            id
            name
            slug
            description
          }
          media {
            url
            alt
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_SLUG_QUERY = /* GraphQL */ `
  query ProductBySlug($channel: String!, $slug: String!) {
    product(channel: $channel, slug: $slug) {
      id
      name
      slug
      description
      category {
        id
        name
        slug
      }
      collections {
        id
        name
        slug
        description
      }
      media {
        url
        alt
      }
      productVariants(first: 20) {
        edges {
          node {
            id
            name
          }
        }
      }
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
        }
      }
    }
  }
`;

export const COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections($channel: String!, $first: Int!) {
    collections(channel: $channel, first: $first) {
      edges {
        node {
          id
          name
          slug
          description
        }
      }
    }
  }
`;

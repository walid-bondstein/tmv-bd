// Next.js App Router sitemap generator
// Exports a default async function that returns an array of
// { url: string, lastModified: Date|string } entries.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function fetchDynamicUrls() {
  // Attempt to fetch product/feature slugs from an API if configured.
  // This is optional: if the API URL is not set or the request fails,
  // we simply return an empty array and the sitemap will include only
  // the static routes below.
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) return [];

  console.log('Sitemap:', apiBase);

  try {
    const res = await fetch(`${apiBase}/api/v1/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    const items = await res.json();
    if (!Array.isArray(items)) return [];

    return items.map((p) => {
      // prefer slug if available, fall back to id
      const idOrSlug = p.slug || p.id || p._id;
      const lastModified = p.updatedAt || p.updated_at || p.modified || new Date().toISOString();
      return {
        url: `${siteUrl}/product-details/${encodeURIComponent(String(idOrSlug))}`,
        lastModified,
      };
    });
  } catch (err) {
    console.log(`Sitemap: Generated `, err.message);
    // On any error, return no dynamic urls — keep sitemap generation resilient.
    return [];
  }
}

export default async function sitemap() {
  const staticPaths = [
    '/',
    '/billing',
    '/cart',
    '/payment-invoice',
    '/store-locations',
    '/features',
    '/product-details',
  ];

  const now = new Date().toISOString();

  const staticEntries = staticPaths.map((p) => ({ url: `${siteUrl}${p}`, lastModified: now }));

  const dynamicEntries = await fetchDynamicUrls();

  return [...staticEntries, ...dynamicEntries];
}


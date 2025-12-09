// Next.js App Router sitemap generator
// Exports a default async function that returns an array of
// { url: string, lastModified: Date|string } entries.
import featuresList from '../public/locales/featuresJSON/feature.json';
import blogsList from '../public/locales/blogsJSON/blogs.json';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function fetchDynamicUrls() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) return [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`,
      {
        next: { revalidate: 3600 }, // or control revalidation at fetch-level
      }
    );
    if (!res.ok) {
      console.log("API returned non-OK status:", res.status);
      return [];
    }

    const data = (await res.json()).data;

    if (!Array.isArray(data)) {
      console.log("Unexpected API structure:", []);
      return [];
    }
    return data.map((p) => {
      // prefer slug if available, fall back to id
      const idOrSlug = p.product_slug || p.id;
      const lastModified = p.updated_at || new Date().toISOString();
      return {
        url: `${siteUrl}/product-details/${encodeURIComponent(String(idOrSlug))}`,
        lastModified,
      };
    })
  } catch (err) {
    console.log(`Sitemap: Generated `, err.message);
    // On any error, return no dynamic urls — keep sitemap generation resilient.
    return [];
  }
}

function featuresListUrls() {
  return featuresList.map((feature) => ({
    url: `${siteUrl}/features/${feature.url}`,
  }))
}

function blogsListUrls() {
  return blogsList.map((feature) => ({
    url: `${siteUrl}/blogs/${feature.url}`,
  }))
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
  const featuresUrls = featuresListUrls();
  const blogsUrls = blogsListUrls();
  return [...staticEntries, ...dynamicEntries, ...featuresUrls, ...blogsUrls];
}


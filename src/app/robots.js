export default function robots() {
  const baseUrl = "https://www.osteobodyhacking.ee";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

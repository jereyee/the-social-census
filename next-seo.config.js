/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "The Social Census",
  titleTemplate: "%s | Discover new perspectives",
  defaultTitle: "The Social Census",
  description: "Discover new perspectives.",
  canonical: "https://social-census.com",
  openGraph: {
    url: "https://social-census.com",
    title: "The Social Census",
    description: "Discover new perspectives.",
    images: [
      {
        url: "https://social-census.com/og-image.png",
        alt: "The Social Census og-image",
      },
    ],
    site_name: "The Social Census",
  } /* 
  twitter: {
    handle: "@sozonome",
    cardType: "summary_large_image",
  }, */,
};

export default defaultSEOConfig;

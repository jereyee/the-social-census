/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "The Social Census",
  titleTemplate: "%s | The Social Census",
  defaultTitle: "The Social Census",
  description: "Discover new perspectives.",
  canonical: "https://social-census.vercel.app",
  openGraph: {
    url: "https://social-census.vercel.app",
    title: "The Social Census",
    description: "Discover new perspectives.",
    images: [
      {
        url: "https://og-image.sznm.dev/**nextchakra-starter**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
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

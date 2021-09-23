/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");

module.exports.poweredByHeader = false;

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self' social-census.com *.social-census.com; img-src https://*;",
  },
];

module.exports.headers = async () => {
  return [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
  ];
};

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    //register: true,
    //sw: "/sw.js",
    scope: "/app",
  },
  reactStrictMode: true,
});

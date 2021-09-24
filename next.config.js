/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");
const { createSecureHeaders } = require("next-secure-headers");

if (process.env.NODE_ENV === "production") {
}

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    //register: true,
    //sw: "/sw.js",
    scope: "/app",
    dynamicStartUrlRedirect: "/login",
  },
  reactStrictMode: true,
  poweredByHeader: false,
  headers: async function () {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          forceHTTPSRedirect: [
            true,
            {
              maxAge: 60 * 60 * 24 * 4,
              includeSubDomains: true,
              preload: true,
            },
          ],
          referrerPolicy: "same-origin",
        }),
      },
    ];
  },
});

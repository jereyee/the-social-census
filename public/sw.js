if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let a = Promise.resolve();
      return (
        i[e] ||
          (a = new Promise(async (a) => {
            if ("document" in self) {
              const i = document.createElement("script");
              (i.src = e), document.head.appendChild(i), (i.onload = a);
            } else importScripts(e), a();
          })),
        a.then(() => {
          if (!i[e]) throw new Error(`Module ${e} didn’t register its module`);
          return i[e];
        })
      );
    },
    a = (a, i) => {
      Promise.all(a.map(e)).then((e) => i(1 === e.length ? e[0] : e));
    },
    i = { require: Promise.resolve(a) };
  self.define = (a, n, s) => {
    i[a] ||
      (i[a] = Promise.resolve().then(() => {
        let i = {};
        const o = { uri: location.origin + a.slice(1) };
        return Promise.all(
          n.map((a) => {
            switch (a) {
              case "exports":
                return i;
              case "module":
                return o;
              default:
                return e(a);
            }
          })
        ).then((e) => {
          const a = s(...e);
          return i.default || (i.default = a), i;
        });
      }));
  };
}
define("./sw.js", ["./workbox-21b21c9a"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/404 Error-pana.svg",
          revision: "ce9734d584dd44ab8929c18df4ac9917",
        },
        {
          url: "/Launching-amico.svg",
          revision: "81e1255c88267110c77e3ffeed34e58e",
        },
        {
          url: "/_next/static/chunks/185-d49ca562686173757e42.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/36bcf0ca-1fcd0bba74afdbf933bb.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/450-168d8afc3181c09dae10.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/464-b9d1f805227ca77690d0.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/497-b3c381a637177264099a.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/603-48d23d3ea0c736af8194.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/604-eb13686ef6f09f6c9847.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/628-9b5d735ca2b5d17cf4a5.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/675-ebbfa0f34efb42446205.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/683-1643ef954fa6308ea824.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/688-a42ac77fe76a5f7f89b3.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/752-fc1b4fb7e0b20191c1fe.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/78e521c3-b79a62b10e0d225c21de.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/916-00ed0a71ff1956442065.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/980-fc58f631c3cac5b53519.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/d7eeaac4-1b222862ee26ab23964f.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/ea88be26-d4d4d473f8dfd066638a.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/framework-2f612445bd50b211f15a.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/main-acb3bf4f499099e88b4a.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/404-e3fe40a5d961c97edd75.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/_app-81d5383fd1c98de39eca.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/_error-ea939aab753d9e9db3bd.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/home-d2202e0c92a96c7d649c.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/index-1f7b94ddf690044d3299.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/login-72cf5fcc9744de1bf1c1.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/login/update-f744e3348b37d890f401.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/match-ee6c22ddcd7ebf5c1df8.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/match/report-3fb7261c945ffbfc3f55.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/question-cd598a1642a1666a24f4.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/responses-d04c929db3bdda9a9295.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/pages/result-81db2b804591ea5d4d42.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/chunks/webpack-4c39ab62e02b39982352.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/css/43cdc3bc7a3ec6213814.css",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/css/74e9564aac3b379e4250.css",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/image/public/homepage/screenshot1.7757835b5a132e0b7fe828b7e6610a7f.png",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/image/public/homepage/screenshot2.88174eb90bd7d288927ecae194d1d33f.png",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/mBY6n0E1y-gKG39LCbFTY/_buildManifest.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/mBY6n0E1y-gKG39LCbFTY/_ssgManifest.js",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/inter-all-400-normal.10f84849b8a69b4844b2925080f81a97.woff",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/inter-cyrillic-400-normal.bc3898d7951d9a7c0dc70d18bdd3ddc7.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/inter-cyrillic-ext-400-normal.c5e8f07ad3c08f221d1e058fa6b5c9c4.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/inter-greek-400-normal.f58e259d41ec5af980dfc66f731a0165.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/inter-greek-ext-400-normal.6af00e5dcf12ad72af064289c648e944.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/inter-latin-400-normal.351b7924dd5e53fb9e5ec938459741d2.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/inter-latin-ext-400-normal.fb78ad31672f0b26438f7c975077411d.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/inter-vietnamese-400-normal.bc4d514951f3d398fda2549e3ffb186e.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-100-normal.764273668bd0236ee703ba6a6b61df8e.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-100-normal.dd1a1063b250acda1969aa1d73c87a89.woff",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-200-normal.3266e8aa8e047f9b5bd27baed190c72c.woff",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-200-normal.4388f3bab620bfb7ee5445cc3f131434.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-300-normal.130ecc29807ae43c485a14850967bd59.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-300-normal.f905188bce6a78f5179328ca8b7ce3c6.woff",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-400-normal.94fcd322b72dc8f9bc06e5a818cc7130.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-400-normal.d91ffea302ac3726538c2278d53830fd.woff",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-500-normal.1aef3a53a50c1f5d47606a6cb5dab579.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-500-normal.ff93fc2a624960c77ac8ef2d183fee60.woff",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-600-normal.32829fee46a16ffa345961220a111d79.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-600-normal.6a124b99bf47db3547b7fc23d601b0ff.woff",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-700-normal.63474568c02374e8ac824e94826e2e8b.woff",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-700-normal.b0807ffaa1c5e0b9e86683287add3b96.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-800-normal.951220541ed8c503fa0930a6c1defd4e.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-800-normal.9d9762f0131563e652268d2e46274b22.woff",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-900-normal.0b4553c24a95f70d537eb65d6fa5b171.woff",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/_next/static/media/lexend-latin-900-normal.d31edbfd3b936edc5e233f450ca3dd21.woff2",
          revision: "mBY6n0E1y-gKG39LCbFTY",
        },
        {
          url: "/chakra-ui-logomark-colored.svg",
          revision: "c1e816730197517b6977fda1c8ee0ec9",
        },
        { url: "/favicon.ico", revision: "21b739d43fcb9bbb83d8541fe4fe88fa" },
        {
          url: "/homepage/screenshot1.png",
          revision: "af74255b020a224dafbfca52c26916e7",
        },
        {
          url: "/homepage/screenshot2.png",
          revision: "cec8b540882fd3bff6606c33a43bacc3",
        },
        {
          url: "/icons/facebook.svg",
          revision: "83c5f3a7e677022da5cfb4bafb611731",
        },
        {
          url: "/icons/heart_outline.svg",
          revision: "b5dae7d29bd46fc7bbd319a14ffe64ec",
        },
        {
          url: "/icons/instagram.svg",
          revision: "64950c8bd7df8c0c1997b608a6aa4050",
        },
        {
          url: "/icons/message_circle.svg",
          revision: "f1e56440b8981403740da9c98d8e2088",
        },
        {
          url: "/icons/socials/google_social.svg",
          revision: "60f39c9f4ac3e3552aa867dc9ac08b30",
        },
        {
          url: "/icons/socials/instagram_social.svg",
          revision: "396fb341c14c50edef70df094ab4baf3",
        },
        {
          url: "/icons/socials/mail.svg",
          revision: "c78d27654ae371154226a1d44b024bf4",
        },
        {
          url: "/icons/socials/reddit_social.svg",
          revision: "b77f05768df52f7fb573e9c4a4649f50",
        },
        {
          url: "/icons/socials/telegram_social.svg",
          revision: "7f6e4a3973c0c3fa1177d2134d681f5f",
        },
        {
          url: "/icons/socials/twitter_social.svg",
          revision: "d733b25d6a12c46648ad3349328f647e",
        },
        {
          url: "/icons/socials/whatsapp_social.svg",
          revision: "8bb2e677d076b159d8c1773ff2defdf0",
        },
        {
          url: "/icons/twitter.svg",
          revision: "e0852285b8efae82a5afb0d93a04ef82",
        },
        {
          url: "/lottie/loading_spinner_with_tick.json",
          revision: "2912ebb7b1fb0ee5105d9f72a8ec8638",
        },
        { url: "/manifest.json", revision: "cafdbe9390a2f185539b2d002a2bbbbb" },
        {
          url: "/next-app-chakra-ts.png",
          revision: "31fb8d30477672d6be25555898ba86ec",
        },
        {
          url: "/nextjs-black-logo.svg",
          revision: "8d9ffb0bd488386a946ef7cb87c0e391",
        },
        {
          url: "/nextjs-icon-dark.svg",
          revision: "add4ddcc93edd11199df5996c5443d96",
        },
        {
          url: "/nextjs-icon-light.svg",
          revision: "112e21eebb868eb7c613e0f75f370f06",
        },
        { url: "/og-image.png", revision: "0ba97bfa95075ff1ff85b23c1aad197a" },
        {
          url: "/pwa-icons/android/android-launchericon-144-144.png",
          revision: "4cb8e440dc3832913ebfbf2143f91a81",
        },
        {
          url: "/pwa-icons/android/android-launchericon-192-192.png",
          revision: "ff75faebdbf94e2bdafcebac77a6626c",
        },
        {
          url: "/pwa-icons/android/android-launchericon-48-48.png",
          revision: "f8f443ffc5b595f71de32bd7893de262",
        },
        {
          url: "/pwa-icons/android/android-launchericon-512-512.png",
          revision: "45cdc5a8cc3205b61f21d1dbef6d3e69",
        },
        {
          url: "/pwa-icons/android/android-launchericon-72-72.png",
          revision: "7341551ab8c93cf559722e389c4d4b43",
        },
        {
          url: "/pwa-icons/android/android-launchericon-96-96.png",
          revision: "bc2f6f682f00d908ddac4e4d7eff6342",
        },
        {
          url: "/pwa-icons/chrome/chrome-extensionmanagementpage-48-48.png",
          revision: "f8f443ffc5b595f71de32bd7893de262",
        },
        {
          url: "/pwa-icons/chrome/chrome-favicon-16-16.png",
          revision: "e7a524048c5ec3cb3c946b3c44d73b11",
        },
        {
          url: "/pwa-icons/chrome/chrome-installprocess-128-128.png",
          revision: "d95e42443ed6c7b0de7de0531485f2dd",
        },
        {
          url: "/pwa-icons/firefox/firefox-general-128-128.png",
          revision: "d95e42443ed6c7b0de7de0531485f2dd",
        },
        {
          url: "/pwa-icons/firefox/firefox-general-16-16.png",
          revision: "e7a524048c5ec3cb3c946b3c44d73b11",
        },
        {
          url: "/pwa-icons/firefox/firefox-general-256-256.png",
          revision: "61da777590678d8b98971d1289ec6c70",
        },
        {
          url: "/pwa-icons/firefox/firefox-general-32-32.png",
          revision: "564568af24584ef824a3db5c7066300a",
        },
        {
          url: "/pwa-icons/firefox/firefox-general-48-48.png",
          revision: "f8f443ffc5b595f71de32bd7893de262",
        },
        {
          url: "/pwa-icons/firefox/firefox-general-64-64.png",
          revision: "9dc78e58ee84db469e56f578a0025698",
        },
        {
          url: "/pwa-icons/firefox/firefox-general-90-90.png",
          revision: "df82e5c60f1e51f3608d7a497de2bcda",
        },
        {
          url: "/pwa-icons/firefox/firefox-marketplace-128-128.png",
          revision: "d95e42443ed6c7b0de7de0531485f2dd",
        },
        {
          url: "/pwa-icons/firefox/firefox-marketplace-512-512.png",
          revision: "45cdc5a8cc3205b61f21d1dbef6d3e69",
        },
        {
          url: "/pwa-icons/msteams/msteams-192-192.png",
          revision: "ff75faebdbf94e2bdafcebac77a6626c",
        },
        {
          url: "/pwa-icons/msteams/msteams-silhouette-32-32.png",
          revision: "564568af24584ef824a3db5c7066300a",
        },
        {
          url: "/pwa-icons/windows10/LargeTile.scale-100.png",
          revision: "d44df0c77dbab84da8bbaf61fe76203e",
        },
        {
          url: "/pwa-icons/windows10/LargeTile.scale-125.png",
          revision: "f52353a5f92c9be710cb6d1f74ca2050",
        },
        {
          url: "/pwa-icons/windows10/LargeTile.scale-150.png",
          revision: "2699e83b00d05a3be3bb5862f624951b",
        },
        {
          url: "/pwa-icons/windows10/LargeTile.scale-200.png",
          revision: "c3b08850c14d78c5012b7eb7a87a098c",
        },
        {
          url: "/pwa-icons/windows10/LargeTile.scale-400.png",
          revision: "5a688a459a0983d703c9882abf4b0b60",
        },
        {
          url: "/pwa-icons/windows10/SmallTile.scale-100.png",
          revision: "672822d4748f3a0014867ddc15af680f",
        },
        {
          url: "/pwa-icons/windows10/SmallTile.scale-125.png",
          revision: "0a18fb9e5e8c7cca8bb090c4d5953b24",
        },
        {
          url: "/pwa-icons/windows10/SmallTile.scale-150.png",
          revision: "92dfe71375633096eb92a33907ce257d",
        },
        {
          url: "/pwa-icons/windows10/SmallTile.scale-200.png",
          revision: "b19a531243bd7a068c6871963ff551e1",
        },
        {
          url: "/pwa-icons/windows10/SmallTile.scale-400.png",
          revision: "3310007d142c190271096e3c3c06e6d9",
        },
        {
          url: "/pwa-icons/windows10/SplashScreen.scale-100.png",
          revision: "65b9470e7a1404ef68d6ea5c798e8fc5",
        },
        {
          url: "/pwa-icons/windows10/SplashScreen.scale-125.png",
          revision: "56fb59075edf084992d8fed87e6158c4",
        },
        {
          url: "/pwa-icons/windows10/SplashScreen.scale-150.png",
          revision: "fc657f5ec3f3cb50d8804ada11bd77ac",
        },
        {
          url: "/pwa-icons/windows10/SplashScreen.scale-200.png",
          revision: "2e2b9a0abab1c0535168c38715a6f5d5",
        },
        {
          url: "/pwa-icons/windows10/SplashScreen.scale-400.png",
          revision: "baab0bed58c8bee022ab48db790efc79",
        },
        {
          url: "/pwa-icons/windows10/Square150x150Logo.scale-100.png",
          revision: "87e32b011c4231fa9b12514f514e15c4",
        },
        {
          url: "/pwa-icons/windows10/Square150x150Logo.scale-125.png",
          revision: "a20398b6ae1efc33e04d222c35f04c92",
        },
        {
          url: "/pwa-icons/windows10/Square150x150Logo.scale-150.png",
          revision: "e61386dbd5b20b4f85c5476e512fc9b2",
        },
        {
          url: "/pwa-icons/windows10/Square150x150Logo.scale-200.png",
          revision: "91ba38fdbf703fd5201d42199c9250b1",
        },
        {
          url: "/pwa-icons/windows10/Square150x150Logo.scale-400.png",
          revision: "65dfab6bf4d6de7cd180542246a967c5",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-16.png",
          revision: "e7a524048c5ec3cb3c946b3c44d73b11",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-20.png",
          revision: "e5585862df07958381b1bdfc74a4e8e7",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-24.png",
          revision: "8f78061b2e540adf9816ccc734b6c9dd",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-256.png",
          revision: "61da777590678d8b98971d1289ec6c70",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-30.png",
          revision: "25ecbf2df02488046ef79bdc2818811d",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-32.png",
          revision: "564568af24584ef824a3db5c7066300a",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-36.png",
          revision: "f06051bb90d99919585a0ab55b562700",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-40.png",
          revision: "65f5a6b262abbe254daf9c5d3e1d57b3",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-44.png",
          revision: "69c2ba6f7a43b72b417c9514a00cf7c0",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-48.png",
          revision: "f8f443ffc5b595f71de32bd7893de262",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-60.png",
          revision: "4d01d95000e276e8547062b2b4f3fac9",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-64.png",
          revision: "9dc78e58ee84db469e56f578a0025698",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-72.png",
          revision: "7341551ab8c93cf559722e389c4d4b43",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-80.png",
          revision: "6c30fb5a316a8b7fa6a979c205b2be0e",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-lightunplated_targetsize-96.png",
          revision: "bc2f6f682f00d908ddac4e4d7eff6342",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-16.png",
          revision: "e7a524048c5ec3cb3c946b3c44d73b11",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-20.png",
          revision: "e5585862df07958381b1bdfc74a4e8e7",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-24.png",
          revision: "8f78061b2e540adf9816ccc734b6c9dd",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-256.png",
          revision: "61da777590678d8b98971d1289ec6c70",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-30.png",
          revision: "25ecbf2df02488046ef79bdc2818811d",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-32.png",
          revision: "564568af24584ef824a3db5c7066300a",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-36.png",
          revision: "f06051bb90d99919585a0ab55b562700",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-40.png",
          revision: "65f5a6b262abbe254daf9c5d3e1d57b3",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-44.png",
          revision: "69c2ba6f7a43b72b417c9514a00cf7c0",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-48.png",
          revision: "f8f443ffc5b595f71de32bd7893de262",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-60.png",
          revision: "4d01d95000e276e8547062b2b4f3fac9",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-64.png",
          revision: "9dc78e58ee84db469e56f578a0025698",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-72.png",
          revision: "7341551ab8c93cf559722e389c4d4b43",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-80.png",
          revision: "6c30fb5a316a8b7fa6a979c205b2be0e",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.altform-unplated_targetsize-96.png",
          revision: "bc2f6f682f00d908ddac4e4d7eff6342",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.scale-100.png",
          revision: "69c2ba6f7a43b72b417c9514a00cf7c0",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.scale-125.png",
          revision: "9faebbeafdea3532067150bd00ae129e",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.scale-150.png",
          revision: "2f796984c51e7566dbb1b918b723d886",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.scale-200.png",
          revision: "0a1044d06b2069ea562f2d194967f704",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.scale-400.png",
          revision: "75969245e8fdb5a4a42576a262b33f4e",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-16.png",
          revision: "e7a524048c5ec3cb3c946b3c44d73b11",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-20.png",
          revision: "e5585862df07958381b1bdfc74a4e8e7",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-24.png",
          revision: "8f78061b2e540adf9816ccc734b6c9dd",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-256.png",
          revision: "61da777590678d8b98971d1289ec6c70",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-30.png",
          revision: "25ecbf2df02488046ef79bdc2818811d",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-32.png",
          revision: "564568af24584ef824a3db5c7066300a",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-36.png",
          revision: "f06051bb90d99919585a0ab55b562700",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-40.png",
          revision: "65f5a6b262abbe254daf9c5d3e1d57b3",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-44.png",
          revision: "69c2ba6f7a43b72b417c9514a00cf7c0",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-48.png",
          revision: "f8f443ffc5b595f71de32bd7893de262",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-60.png",
          revision: "4d01d95000e276e8547062b2b4f3fac9",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-64.png",
          revision: "9dc78e58ee84db469e56f578a0025698",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-72.png",
          revision: "7341551ab8c93cf559722e389c4d4b43",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-80.png",
          revision: "6c30fb5a316a8b7fa6a979c205b2be0e",
        },
        {
          url: "/pwa-icons/windows10/Square44x44Logo.targetsize-96.png",
          revision: "bc2f6f682f00d908ddac4e4d7eff6342",
        },
        {
          url: "/pwa-icons/windows10/StoreLogo.scale-100.png",
          revision: "c92a9855af060c665f623262d0d6e8db",
        },
        {
          url: "/pwa-icons/windows10/StoreLogo.scale-125.png",
          revision: "45a2f65636d85db21c65276cc2ce8535",
        },
        {
          url: "/pwa-icons/windows10/StoreLogo.scale-150.png",
          revision: "1987454ea35246df602f286f519d6fb8",
        },
        {
          url: "/pwa-icons/windows10/StoreLogo.scale-200.png",
          revision: "16694456a56a2cfc5ac864194fe29982",
        },
        {
          url: "/pwa-icons/windows10/StoreLogo.scale-400.png",
          revision: "a0526f20ddf62076b7cdeef3c501721a",
        },
        {
          url: "/pwa-icons/windows10/Wide310x150Logo.scale-100.png",
          revision: "514523cf4853654f9eb3b597020adfd4",
        },
        {
          url: "/pwa-icons/windows10/Wide310x150Logo.scale-125.png",
          revision: "c9dd13ba3e58fd3a47bbf6a96c1de48a",
        },
        {
          url: "/pwa-icons/windows10/Wide310x150Logo.scale-150.png",
          revision: "edcdcbb222fed727107a62ba4e268ca1",
        },
        {
          url: "/pwa-icons/windows10/Wide310x150Logo.scale-200.png",
          revision: "65b9470e7a1404ef68d6ea5c798e8fc5",
        },
        {
          url: "/pwa-icons/windows10/Wide310x150Logo.scale-400.png",
          revision: "2e2b9a0abab1c0535168c38715a6f5d5",
        },
        { url: "/robots.txt", revision: "d2c406403215d013358e07cd108ba4ef" },
        { url: "/sitemap.xml", revision: "94699e4b5f3d77beae90bf08769eb71d" },
        {
          url: "/ts-logo-512.svg",
          revision: "c87187cad0ab07cb31c76fb8facda1e1",
        },
        { url: "/vercel.svg", revision: "4b4f1876502eb6721764637fe5c41702" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: a,
              event: i,
              state: n,
            }) =>
              a && "opaqueredirect" === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: "OK",
                    headers: a.headers,
                  })
                : a,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith("/api/auth/") && !!a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});

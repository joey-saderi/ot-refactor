// next.config.js

const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const withFonts = require("next-fonts");
const withPWA = require("next-pwa");

module.exports = withPWA(
  withFonts(
    withCSS(
      withSass(
        withImages({
          pwa: {
            disable: process.env.NODE_ENV === "production" ? false : true,
            dest: "public",
          },
          /* config options here */
          env: {
            SITE_URL: "https://otoli.net",
            PRODUCTION_ENDPOINT: "https://core.otoli.net",
            SENTRY:
              "https://5457324b508844abba775737bc14838e@sentry.io/1547488",
            GOOGLE_CAPTCHA: "6Ler8sIZAAAAAP_s64xgDM2HCm03wCuARkotJani",
          },
          webpack(config, options) {
            compress = true;
            return config;
          },
          crossOrigin: "anonymous",
        })
      )
    )
  )
);

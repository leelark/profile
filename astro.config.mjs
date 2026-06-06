import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

const legacyProjectSlugs = [
  "ebrd-asb-modernization",
  "rapid2-hsbc-horizon-scanning",
  "invesco-aml-change-management",
  "invesco-reconciliation-system",
  "carlyle-bridge-module"
];
const basePath = "/profile/";

export default defineConfig({
  site: "https://leelark.github.io",
  base: basePath,
  output: "static",
  trailingSlash: "always",
  integrations: [
    react(),
    sitemap({
      filter: (page) => !legacyProjectSlugs.some((slug) => page.includes(`${basePath}work/${slug}/`))
    })
  ],
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  }
});

import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://leelark.github.io",
  base: "/profile/",
  output: "static",
  trailingSlash: "always",
  integrations: [react(), sitemap()],
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  }
});

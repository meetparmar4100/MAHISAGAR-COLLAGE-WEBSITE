import { infrastructurePages } from "./src/infrastructurePages.js";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

import { academicPages, committeePages } from "./src/navigation.js";
import { aboutPages } from "./src/aboutPages.js";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        ...Object.fromEntries(
          Object.keys(aboutPages).map((slug) => [
            slug,
            fileURLToPath(new URL(`./${slug}/index.html`, import.meta.url)),
          ]),
        ),
        ...Object.fromEntries(
          Object.keys(academicPages).map((slug) => [
            `academics/${slug}`,
            fileURLToPath(new URL(`./academics/${slug}/index.html`, import.meta.url)),
          ]),
        ),
        ...Object.fromEntries(
          Object.keys(infrastructurePages).map((slug) => [
            `infrastructure/${slug}`,
            fileURLToPath(new URL(`./infrastructure/${slug}/index.html`, import.meta.url)),
          ]),
        ),
        ...Object.fromEntries(
          Object.keys(committeePages).map((slug) => [
            `committees/${slug}`,
            fileURLToPath(new URL(`./committees/${slug}/index.html`, import.meta.url)),
          ]),
        ),
        infrastructure: fileURLToPath(new URL("./infrastructure/index.html", import.meta.url)),
        home: fileURLToPath(new URL("./index.html", import.meta.url)),
        about: fileURLToPath(new URL("./about-college/index.html", import.meta.url)),
      },
    },
  },
});

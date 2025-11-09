// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite"; // For Designs Deployment

import vercel from "@astrojs/vercel"; // For Vercel Website Deployment

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});

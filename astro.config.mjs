// @ts-check
import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

import auth from "auth-astro";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), auth()],

  vite: {
    plugins: [tailwindcss()],
  },
  output:'server',
  adapter: vercel(),
});
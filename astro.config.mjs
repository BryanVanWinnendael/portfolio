// @ts-check
import { defineConfig } from "astro/config"

import react from "@astrojs/react"

import tailwind from "@astrojs/tailwind"

import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  output: "server",
  adapter: vercel({
    isr: {
      // caches all pages on first request and saves for 1 day
      expiration: 60 * 60 * 24,
    },
  }),
})

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "LifeLink AI",
        short_name: "LifeLink",
        description: "AI-powered emergency safety companion",
        theme_color: "#e63946",
        background_color: "#f5f6f8",
        display: "standalone",
        orientation: "portrait",

        icons: [
  {
    src: "/pwa-192.png",
    sizes: "192x192",
    type: "image/png",
  },
  {
    src: "/pwa-512.png",
    sizes: "512x512",
    type: "image/png",
  },
],
      },

      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
            },
          },
        ],
      },
    }),
  ],
});
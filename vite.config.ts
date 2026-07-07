import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const FAVICONS = {
  preview: "/favicon.preview.ico",
  development: "/favicon.development.ico",
} as const

const deployEnv = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development"
const faviconHref =
  deployEnv === "production"
    ? "/favicon.ico"
    : FAVICONS[deployEnv as keyof typeof FAVICONS] ?? "/favicon.development.ico"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "env-favicon-html-replacement",
      transformIndexHtml(html) {
        return html
          .replace(/%FAVICON_HREF%/g, faviconHref)
          .replace(/%DEPLOY_ENV%/g, deployEnv)
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: "public",
})

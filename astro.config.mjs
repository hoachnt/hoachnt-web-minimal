import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

export default defineConfig({
    integrations: [
        react(),
    ],

    output: "server",

    adapter: vercel(),

    vite: {
        plugins: [tailwindcss()],
    },
});
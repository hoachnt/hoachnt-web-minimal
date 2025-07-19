import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	integrations: [
		react(),
	],

	output: "server",

	adapter: node({
		mode: "standalone",
	}),

	vite: {
		plugins: [tailwindcss()],
	},
});

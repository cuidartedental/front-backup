import adapter from '@sveltejs/adapter-netlify'; // Cambia auto por netlify
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// El adaptador de netlify configura las redirecciones por ti
		adapter: adapter()
	}
};

export default config;
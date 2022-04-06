import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import yaml from '@rollup/plugin-yaml';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    }
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: true
      }
    }),
    yaml()
  ]
})

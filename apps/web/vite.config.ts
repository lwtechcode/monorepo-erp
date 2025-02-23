import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Change 'mikus-addons' to your exact GitHub repo name if different!
  base: process.env.NODE_ENV === 'production' ? '/mikus-addons/' : '/',
});

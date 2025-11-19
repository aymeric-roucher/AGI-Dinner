import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoBase = '/AGI-Dinner/';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? repoBase : '/',
  plugins: [react()],
  server: {
    port: 4173,
  },
}));

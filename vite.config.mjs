import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: env.VITE_BASE || '/',
    plugins: [
      react(),
    ],
    build: {
      target: 'es2015',
    },
  };
});

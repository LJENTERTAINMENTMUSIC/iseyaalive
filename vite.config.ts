import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cast process to 'any' to avoid TS errors if @types/node is missing
  const cwd = (process as any).cwd();
  const env = loadEnv(mode, cwd, '');
  
  return {
    plugins: [react()],
    // Base must be '/' for custom domains (iseyaa.com)
    base: '/', 
    define: {
      // Robustly replace process.env.API_KEY during build time
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false, // Disable sourcemaps for production security
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'lucide-react', 'recharts'],
            ai: ['@google/genai']
          }
        }
      }
    }
  };
});
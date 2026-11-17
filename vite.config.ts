import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Generates the Vite configuration with environment variable polyfills and bundle optimizations
 * @danishansari-dev mode - The current Vite running mode (development, production)
 * @returns Vite UserConfig object
 */
export default defineConfig(({ mode }) => {
  // Why: In production and preview, environment variables need to be pulled from system env and .env files
  const env = loadEnv(mode, '.', '');

  // Tricky logic: Vercel environment variables can be set as API_KEY, GEMINI_API_KEY, or VITE_GEMINI_API_KEY.
  // We resolve the first available key to support local dev, Vercel UI, and AI Studio embeds seamlessly.
  const resolvedApiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || env.API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.API_KEY || '';

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    // Why: Client-side bundles in Vite do not have access to Node's process.env; this define block safely inlines the keys
    define: {
      'process.env.API_KEY': JSON.stringify(resolvedApiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(resolvedApiKey),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      // Why: The Google GenAI and React dependencies naturally exceed 500kB; raising limit suppresses false-alarm warnings
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Why: Splitting bulky third-party libraries into separate chunks improves browser caching and initial page load speed
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-genai': ['@google/genai']
          }
        }
      }
    }
  };
});

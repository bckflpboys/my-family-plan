import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Define global variables for NextAuth.js
  define: {
    'process.env': {
      NEXTAUTH_URL: JSON.stringify(process.env.NEXTAUTH_URL || 'http://localhost:5173'),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    'process.browser': true,
    'process.version': JSON.stringify(process.version),
  },
  // Resolve Node.js modules for browser
  resolve: {
    alias: {
      // Polyfills for Node.js modules
      process: 'process/browser',
      stream: 'stream-browserify',
      util: 'util',
    },
  },
});

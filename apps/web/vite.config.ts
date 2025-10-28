import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3020,
    host: '0.0.0.0',
    strictPort: true,
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  optimizeDeps: {
    include: ['react-native-web'],
  },
});
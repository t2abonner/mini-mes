import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // REST-запросы: /api/v1/... → http://localhost:4000/api/v1/...
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      // Socket.IO: и HTTP-рукопожатие (polling), и WebSocket-апгрейд
      '/socket.io': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});

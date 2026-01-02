import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global:`window`,
   },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // Nếu backend có prefix /api thì giữ nguyên dòng này
        // Nếu không có, hãy bật rewrite bên dưới:
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

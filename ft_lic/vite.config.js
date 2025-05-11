import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/elders': 'http://localhost:3000',
      '/volunteers': 'http://localhost:3000',
      '/donations': 'http://localhost:3000',
      '/events': 'http://localhost:3000', 
      '/users': 'http://localhost:3000', 
      '/connections': 'http://localhost:3000', 
    }
  }
});
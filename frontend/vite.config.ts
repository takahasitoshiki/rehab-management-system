import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import path from 'path';

// __dirname の代わりに fileURLToPath を使用
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // `@` を `src` にエイリアス設定
    },
  },
  server: {
    host: true, // ← 外部（Docker外）からアクセスを許可
    port: 5173,
  },
});
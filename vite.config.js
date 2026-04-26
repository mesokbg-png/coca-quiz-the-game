import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/coca-quiz-the-game/',
  plugins: [react()],
});

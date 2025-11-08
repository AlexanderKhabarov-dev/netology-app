import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'index.js',
      name: 'MyLib',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
      },
    },
  },
  server: {
    port: 3001,
    fs: {
      strict: false,
    },
  },
})

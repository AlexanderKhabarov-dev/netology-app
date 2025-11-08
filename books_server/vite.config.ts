import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'server/views',
          dest: '',
        },
      ],
    }),
  ],
  build: {
    ssr: 'server/index.ts',
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      { find: 'http', replacement: 'node:http' },
      { find: 'fs', replacement: 'node:fs' },
    ],
  },
})

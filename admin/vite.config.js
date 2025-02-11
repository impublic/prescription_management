// import { defineConfig } from 'vite'
//  import react from '@vitejs/plugin-react'
//   import html from 'vite-plugin-html';
// // // https://vitejs.dev/config/
//  export default defineConfig({
//    plugins: [react()],
//    server:{port:5174},
//      html()
  
//  })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{
//   port:5174,
//   strictPort: true,
//   },
//   optimizeDeps: {
//     exclude: ['@mapbox/node-pre-gyp']
//   }
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
  port:5174,
  strictPort: true,
  },
  resolve: {
    alias: {
      'node-pre-gyp': false,
    },
  },
  optimizeDeps: {
    exclude: ['@mapbox/node-pre-gyp']
  },
  ssr: {
    noExternal: ['node-pre-gyp'],
  }
 
})

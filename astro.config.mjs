// @ts-check
import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    server: {
      proxy: {
        '/api/supabase': {
          target: 'https://sbwmznwbfjcnnmgqvifv.supabase.co',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/supabase/, '')
        }
      }
    }
  }
})

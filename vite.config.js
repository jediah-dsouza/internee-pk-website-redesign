import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/internee-pk-website-redesign/',
  plugins: [react()],
})

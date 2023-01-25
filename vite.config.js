import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

// gamepad
// https://vitejs.dev/config/
export default defineConfig({
	base: "/gamepad/",
  plugins: [vue()],
	server: {
	  https: {
	    key: fs.readFileSync('./cert/localhost-key.pem'),
	    cert: fs.readFileSync('./cert/localhost.pem'),
	  }
	},  
})

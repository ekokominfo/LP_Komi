import {defineConfig} from 'vite';
export default defineConfig({base:'./',publicDir:false,build:{outDir:'wordpress/komi-office/assets',emptyOutDir:true,lib:{entry:'wordpress/office.js',formats:['es'],fileName:()=> 'office.js',cssFileName:'office'},rollupOptions:{output:{assetFileNames:'office.[ext]'}}}});

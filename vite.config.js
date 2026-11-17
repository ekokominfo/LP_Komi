import {defineConfig} from 'vite';
export default defineConfig({build:{target:"esnext"},base:process.env.GITHUB_ACTIONS?'/LP_Komi/':'/'});

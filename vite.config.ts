import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// import dns from 'dns';
// dns.setDefaultResultOrder('verbatim');

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), svgrPlugin(), tailwindcss()],
    envDir: './env',
    server: {
        port: 4000,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        const modulePath = id.split('node_modules/')[1];
                        const topLevelFolder = modulePath.split('/')[0];
                        if (topLevelFolder !== '.pnpm') {
                            return topLevelFolder;
                        }
                        const scopedPackageName = modulePath.split('/')[1];
                        const chunkName =
                            scopedPackageName.split('@')[scopedPackageName.startsWith('@') ? 1 : 0];
                        return chunkName;
                    }
                },
            },
        },
    },
});

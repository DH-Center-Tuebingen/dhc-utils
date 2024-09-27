import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import packageJson from './package.json' with { type: 'json' }
import dts from 'vite-plugin-dts';

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const name = packageJson.name


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({ 
            rollupTypes: true,
            tsconfigPath: path.resolve(__dirname, './tsconfig.build.json'),
        }),
    ],
    build: {
        minify: false,
        target: 'esnext',
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, './src/exports.ts'),
            name,
            fileName: (format) => `${name}.${format}.js`
        },
        rollupOptions: {
            external: (id) => id.endsWith('.test.ts'),
        },
    }
});
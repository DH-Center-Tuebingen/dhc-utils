import { fileURLToPath } from 'node:url'
import path, { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import packageJson from './package.json' with { type: 'json' }
import dts from 'vite-plugin-dts';
    
const __dirname = dirname(fileURLToPath(import.meta.url));
const name = packageJson.name

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({ 
            rollupTypes: true,
            tsconfigPath: path.resolve(__dirname, './tsconfig.build.json'),
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            "§": resolve(__dirname, "src", "types"),
        },
    },
    build: {
        minify: false,
        target: 'esnext',
        sourcemap: true,
        lib: {
            entry: {
                index: path.resolve(__dirname, './src/exports.ts'),
                string: path.resolve(__dirname, './src/string/index.ts')
            },
            name,
            fileName: (format) => `${name}.${format}.js`
        },
        rollupOptions: {
            external: (id) => id.endsWith('.test.ts'),
        },
    }
});
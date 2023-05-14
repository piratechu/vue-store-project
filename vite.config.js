import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import vue from "@vitejs/plugin-vue";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueI18nPlugin({
            include: resolve(dirname(fileURLToPath(import.meta.url)), "./src/i18n/lang/**"),
        }),
        createSvgIconsPlugin({
            // 指定緩存的圖標資料夾
            iconDirs: [path.resolve(process.cwd(), "src/assets")],
            // 指定 symbol Id 格式
            symbolId: "icon-[dir]-[name]",
        }),
    ],
    base: "/myapp",
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});

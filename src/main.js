import { createApp } from "vue";
import i18n from "./i18n/i18n";
import { createPinia } from "pinia";
import router from "./router/index.js";
import { useErrorLogStore } from "./store/errorLog";

// import "highlight.js/styles/stackoverflow-light.css";
// import hljs from "highlight.js/lib/core";
// import javascript from "highlight.js/lib/languages/javascript";
// import hljsVuePlugin from "@highlightjs/vue-plugin";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// if you're using CDN, please remove this line.
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./style.css";
import App from "./App.vue";

// hljs.registerLanguage("javascript", javascript);
// hljs.registerLanguage("tsql", javascript);

const app = createApp(App).use(i18n).use(createPinia()).use(ElementPlus).use(router);
// app.use(hljsVuePlugin);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

const useErrorLog = useErrorLogStore();

// app.config.errorHandler = (err, instance, info) => {
//     // console.log(`Error: ${err.toString()}\nInfo: ${info}`);
//     useErrorLog.addErrorLog(err);
// };
app.mount("#app");

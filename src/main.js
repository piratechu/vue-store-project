import { createApp } from "vue";
import i18n from "./i18n/i18n";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router/index.js";
import { useErrorLogStore } from "./store/errorLog";

import "virtual:svg-icons-register";

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
// global compoment
import SvgIcon from "./components/SvgIcon.vue";

//import Pinia Persist
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App).use(i18n).use(pinia).use(ElementPlus).use(router);
// app.use(hljsVuePlugin);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
// 攔截錯誤log，可以在production註冊或者傳送到遠端伺服器
// const useErrorLog = useErrorLogStore();
// app.config.errorHandler = (err, instance, info) => {
//     // console.log(`Error: ${err.toString()}\nInfo: ${info}`);
//     useErrorLog.addErrorLog(err);
// };
// global registration - can use anywhere
app.component("svgIcon", SvgIcon);
app.mount("#app");

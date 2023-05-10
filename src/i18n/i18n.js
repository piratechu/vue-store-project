import { createI18n } from "vue-i18n";
//匯入語系

import tw from "./lang/tw.json";
import en from "./lang/en.json";

const i18n = createI18n({
    legacy: false, // use composition api set false
    locale: "tw", // set locale
    fallbackLocale: "tw", // 設定當語系無法使用時的語系
    globalInjection: true, // 全域注入，讓你在 <template> 可以使用 $t
    messages: {
        tw,
        en,
    },
});

export default i18n;

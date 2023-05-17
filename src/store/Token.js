import { defineStore } from "pinia";
import { ref, computed } from "vue";

//setup store, vue composition api setup function
export const useTokenStore = defineStore(
    "Token",
    () => {
        const Token = ref("");
        const getToken = computed(() => {
            return Token.value;
        });
        const resetToken = () => {
            Token.value = "";
            // console.log("Pinia resetToken:", Token.value);
        };
        return { Token, getToken, resetToken };
    },
    // 在使用的時候會自動 restore
    { persist: [{ storage: localStorage, paths: ["Token"] }] }
);

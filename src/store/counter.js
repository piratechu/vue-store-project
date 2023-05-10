import { defineStore } from "pinia";
import { ref } from "vue";

//setup store, vue composition api setup function
export const useCounterStore = defineStore("counter", () => {
    const counter = ref(100);
    return { counter };
});

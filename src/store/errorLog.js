import { defineStore } from "pinia";
import { ref, computed } from "vue";

//setup store, vue composition api setup function
export const useErrorLogStore = defineStore("errorLog", () => {
    const logs = ref([]);
    const addErrorLog = (log) => {
        logs.value.push(log);
        console.log("From Error log:", logs);
    };
    const clearErrorLog = () => {
        logs.value.splice(0);
    };
    const getErrorLog = () => {
        return logs;
    };
    return { addErrorLog, clearErrorLog, getErrorLog };
});

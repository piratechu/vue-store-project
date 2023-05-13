<template>
    <div>
        <h1>Login main page!!</h1>
        <el-switch
            v-model="value1"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-text="TW"
            inactive-text="EN"
        />
        <h1>{{ $t("__hello_world") }}</h1>
        <svgIcon name="svg-bug-line" />
        <svgIcon name="vue" />
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
// import svgIcons from "../utils/svg-icons";

const { locale } = useI18n();
const value1 = ref(true);

watchEffect(() => {
    value1.value ? (locale.value = "tw") : (locale.value = "en");
});
</script>

<style scoped></style>

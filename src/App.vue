<script setup>
import { provide } from "vue";
// import { useI18n } from "vue-i18n";

// const { t } = useI18n();
// define setting
// system name
provide("appName", "store-project");
// system version
provide("appVer", "1.3.0");
// table page size
provide("pageSize", 20);
</script>

<template>
    <Router-View />
</template>

<style scoped></style>

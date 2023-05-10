<template>
    <el-breadcrumb separator="/" class="router-breadcrumb">
        <!-- <el-breadcrumb-item to="/" key="storeHome">少商採購</el-breadcrumb-item> -->
        <el-breadcrumb-item
            v-for="(route, index) in route.matched"
            v-if="route.path != ''"
            :to="route.path"
            :key="index"
            >{{ route.meta.title }}</el-breadcrumb-item
        >
    </el-breadcrumb>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped>
.router-breadcrumb {
    font-size: 14px;
}
@media only screen and (max-width: 800px) {
    .router-breadcrumb {
        display: none !important;
    }
}
</style>

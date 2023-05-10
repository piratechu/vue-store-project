<script setup>
import AppBreadcrumb from "../components/AppBreadcrumb.vue";
import AppHeader from "../components/layout/AppHeader.vue";
components: {
    AppHeader, AppBreadcrumb;
}
</script>

<template>
    <div class="common-layout">
        <el-container class="main_container">
            <el-header><AppHeader /></el-header>
            <el-main>
                <AppBreadcrumb />
                <el-scrollbar>
                    <Router-View />
                </el-scrollbar>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
.mobileMenu {
    display: none;
}
.common-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.main_container {
    height: 100%;
    width: 100%;
}
</style>

<template>
    <div><h1>Layout布局</h1></div>
    <div class="slider-demo-block">
        <span class="demonstration">格柵間隔: {{ gutterValue }}</span>
        <el-slider v-model="gutterValue" :step="5" show-stops />
    </div>
    <el-row :gutter="gutterValue">
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
    <el-row :gutter="gutterValue">
        <el-col hidden-lg-and-down :span="8"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="12"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
    <el-row :gutter="gutterValue" justify="space-evenly" class="row-bg">
        <el-col :span="6"><div class="grid-content ep-bg-purple">6</div></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
</template>

<script setup>
import "element-plus/theme-chalk/display.css";
import { ref, computed, reactive } from "vue";

const gutterValue = ref(0);
const useCarts = useShippingCartStore();
</script>

<style lang="scss" scoped>
.row-bg {
    background-color: blue;
}
.slider-demo-block {
    display: flex;
    align-items: center;
}
.slider-demo-block .el-slider {
    margin-top: 0;
    margin-left: 12px;
}
.slider-demo-block .demonstration {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    line-height: 44px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
    flex: 0 0 70%;
}
.ep-bg-purple {
    background-color: #ddd;
}
.el-row {
    margin-bottom: 20px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
    align-content: center;
    justify-content: center;
    border-radius: 4px;
}

.grid-content {
    size: 20px;
    border-radius: 4px;
    min-height: 36px;
}
</style>

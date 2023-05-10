<template>
    <div style="width: 50%">
        <el-alert type="info" title="免費寄送" description="適用於 NT$4,500 以上訂單。" />
    </div>
</template>

<script setup>
import { useShippingCartStore } from "../store/ShoppingCart";
const useCarts = useShippingCartStore();
</script>

<style lang="scss" scoped></style>

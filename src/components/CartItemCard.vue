<template>
    <el-row>
        <el-col :span="6"
            ><el-image :src="product.image" style="height: 100px; margin: 10px auto" fit="contain" />
        </el-col>
        <el-col :span="12">
            <div style="font-size: 1.2rem">{{ product.title }}</div>
            <div style="font-size: 1rem">{{ product.category }}</div>
            <div>
                <el-select v-model="form.spec">
                    <template #prefix> 規格 </template>
                    <el-option :key="1" value="單一規格" />
                </el-select>
                <el-select v-model="form.qty">
                    <template #prefix> 數量 </template>
                    <el-option v-for="i in 10" :key="i" :value="i" />
                </el-select>
            </div>
            <div style="padding-top: 10px">
                <svgIcon name="svg-favorite" className="svgFavorite" />
                <svgIcon name="svg-delete" className="svgDelete" @click="removeCarts(product.id)" />
            </div>
        </el-col>
        <el-col :span="6">
            <div
                style="
                    display: flex;
                    font-size: 2rem;
                    position: relative;
                    height: 100%;
                    align-items: center;
                    color: #555;
                "
            >
                <span style="text-decoration-line: line-through; color: #ccc">${{ product.price }}</span>

                <span>${{ Math.round(product.price * form.qty * form.discount * 100.0) / 100.0 }}</span>
            </div></el-col
        >
        <el-divider />
    </el-row>
</template>

<script setup>
import svgIcon from "../components/SvgIcon.vue";
import { useShippingCartStore } from "../store/ShoppingCart";

name: "CartItemCard";
const props = defineProps({
    cartItem: Object,
    require: true,
});

//console.log("CartItemCard:", props.cartItem);
const { product, form } = props.cartItem;
const useCarts = useShippingCartStore();
console.log("CartItemCard:", product, form);

function removeCarts(id) {
    useCarts.moveOutCarts(id);
}
</script>

<style lang="scss" scoped>
.svgDelete {
    cursor: pointer;
}
.svgDelete:hover {
    color: red;
}

.svgFavorite:hover {
    color: red;
}
</style>

<template>
    <el-row :gutter="10" justify="space-around">
        <el-col :span="12">
            <div>
                <br />
                <el-alert type="info" title="免費寄送" description="適用於 NT$4,500 以上訂單。" />
                <el-row v-for="l in cartsItems" :id="l.id">
                    <el-col :span="6"
                        ><el-image :src="l.product.image" style="height: 100px; margin: 10px auto" fit="contain" />
                    </el-col>
                    <el-col :span="12">
                        <div style="font-size: 1.2rem">{{ l.product.title }}</div>
                        <div style="font-size: 1rem">{{ l.product.category }}</div>
                        <div>
                            <el-select v-model="l.form.spec">
                                <template #prefix> 規格 </template>
                                <el-option :key="1" value="單一規格" />
                            </el-select>
                            <el-select v-model="l.form.qty">
                                <template #prefix> 數量 </template>
                                <el-option v-for="i in 10" :key="i" :value="i" />
                            </el-select>
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
                            <span style="text-decoration-line: line-through; color: #ccc">${{ l.product.price }}</span>

                            <span
                                >${{ Math.round(l.product.price * l.form.qty * l.form.discount * 100.0) / 100.0 }}</span
                            >
                        </div></el-col
                    >
                    <el-divider />
                </el-row>
            </div>
        </el-col>
        <el-col :span="10">
            <div>
                <el-row>
                    <el-col style="padding-bottom: 20px">
                        <h1>摘要</h1>
                    </el-col>
                    <el-col>
                        <el-row>
                            <el-col :span="16">
                                <span>小計</span>
                            </el-col>
                            <el-col :span="6">
                                <span>${{ totalFee }}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="16">
                                <span>預估運費與手續費</span>
                            </el-col>
                            <el-col :span="6">
                                <span>免運費</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col>
                        <span>總計</span>
                    </el-col>
                    <el-col>
                        <el-button round class="cartBtn">結帳</el-button>
                    </el-col>
                    <el-col>
                        <el-button round class="cartBtn"
                            ><el-icon size="30"><CreditCard /></el-icon
                        ></el-button>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <br /><br /><br /><br /><br />
    <h1>你可能會喜歡</h1>
    <el-row>
        <el-col>
            <el-carousel :interval="4000" type="card" height="400px">
                <el-carousel-item v-for="item in recommend" :key="item.id">
                    <h3 text="2xl" justify="center">
                        <el-image :src="item.image" style="height: 400px; margin: 10px auto" fit="contain" />
                    </h3>
                </el-carousel-item>
            </el-carousel>
        </el-col>
    </el-row>
</template>

<script setup>
import { useShippingCartStore } from "../store/ShoppingCart";
import { getProductsLimit } from "../apis/apiProducts";
import { watchEffect, ref, computed } from "vue";

const useCarts = useShippingCartStore();
const recommend = ref({});
const cartsItems = computed(() => useCarts.getCartsList());
const totalFee = computed(() => {
    let tmp = cartsItems.value;
    let tmpTotal = 0;
    tmp.filter((el) => {
        tmpTotal += Math.round(el.form.qty * el.product.price * el.form.discount * 100.0) / 100.0;
    });
    return tmpTotal;
});

watchEffect(async () => {
    getRecommendProduct();
});

async function getRecommendProduct() {
    await getProductsLimit(6)
        .then((res) => {
            recommend.value = res.data;
            console.log(recommend);
        })
        .catch((error) => {
            console.log(error);
        });
}
</script>

<style lang="scss" scoped>
.el-col {
    padding-bottom: 10px;
}
.el-col > span {
    font-size: 1.5rem;
    font-weight: 500;
}
.cartBtn {
    width: 250px;
    height: 50px;
    background-color: black;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #eee;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #fff;
}
</style>

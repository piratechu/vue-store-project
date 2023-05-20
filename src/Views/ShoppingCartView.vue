<template>
    <el-row :gutter="10" justify="space-around">
        <el-col :span="12">
            <div>
                <br />
                <el-row>
                    <el-alert type="info" title="免費寄送" description="適用於 NT$4,500 以上訂單。" />
                </el-row>
                <!-- 購物車列表物件 -->
                <div>
                    <CartItemCard v-for="l in cartsItems" :key="l.product.id" :cartItem="l" />
                </div>
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
import CartItemCard from "../components/CartItemCard.vue/";
import svgIcon from "../components/SvgIcon.vue";

const useCarts = useShippingCartStore();
const recommend = ref({});
const cartsItems = computed(() => useCarts.getCartsList());
const totalFee = computed(() => {
    let tmp = cartsItems.value;
    let tmpTotal = 0;
    tmp.filter((el) => {
        tmpTotal += el.form.qty * el.product.price * el.form.discount;
    });
    return tmpTotal.toFixed(2);
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

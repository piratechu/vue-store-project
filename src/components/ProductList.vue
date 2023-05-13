<template>
    <div style="width:100%;padding-left:2%;padding-top: 20px;">
    <el-button :key="0" @click="getProduct">All</el-button>
    <el-button v-for="(c,index) in CategoriesData" :key="index" @click="getProductInSpecificCategory(c)" round>
    {{ c }}
    </el-button>
</div>
<!-- <el-row :gutter="2">
        <el-col :span="1" v-for="i in 24" :key="i"><div class="grid-content ep-bg-purple">{{ i }}</div></el-col>
</el-row> -->


    <el-main>
        <el-space direction="vertical" alignment="flex-start">
            <el-skeleton style="width: 240px" :loading="loading" animated :count="1" :throttle="500">
                <template #template>
                    <el-skeleton-item variant="image" style="width: 400px; height: 267px" />
                    <div style="padding: 14px">
                        <el-skeleton-item variant="h3" style="width: 50%" />
                        <div>
                            <el-skeleton-item variant="text" style="margin-right: 16px" />
                            <el-skeleton-item variant="text" style="width: 30%" />
                        </div>
                    </div>
                </template>
                <!-- 此處的 template 是 el-skeleton 的 slot -->
                <template #default>
                        <el-row :gutter="10" justify="start" >
                        <el-col :span="8" v-for="(p, index) in ProductsData" :key="p.id">
                    <el-card shadow="hover" :body-style="{ padding: '10px' }">
                        <template #header>
                            <div class="card-header">
                            <span
                                >{{ p.category }}
                                <el-icon><CaretRight /></el-icon>
                                {{ p.title }}</span
                            >
                        </div>
                        </template>

                        <div key="contain" style="text-align: center;">
                            <el-image
                                :src="p.image"
                                style="height:200px;margin:10px auto;"
                                fit="contain"
                                lazy
                            >
                            <template #placeholder>
                                <div class="image-slot">Loading<span class="dot">...</span></div>
                            </template>                            
                    </el-image>
                </div>
                        <div>
                            <p><h3>NT.${{ p.price }}</h3></p>
                            <p>
                                <el-rate
                                    :model-value="p.rating.rate"
                                    disabled
                                    show-score
                                    size = 'small'
                                />
                                ({{ p.rating.count }})
                                <el-button @click="ConfirmPutInCart(p)">Add Cart</el-button>
                            </p>
                        </div>
                    </el-card>
                </el-col>
                    </el-row>
                </template>
            </el-skeleton>
        </el-space>
    </el-main>
    <!-- 加入購物車提示 -->
    <!-- <el-dialog v-model="centerDialogVisable" title="加入購物車" width="30%" height="300px" center> -->
    <el-drawer v-model="centerDialogVisable" :show-close="true" size="60%" style="height:55%;top:40%;right:20%;">
        <template #header>
            <div><h3>{{ DialogData.title }}</h3></div>
        </template>
        <el-row :gutter="5">
            <el-col :span="4" style="text-align: center;">
        <el-image
                                :src="DialogData.image"
                                style="height:100px;margin:10px auto;"
                                fit="contain"
                                lazy
                            />
                        </el-col>
        <el-col :span="16" :offset="2" style="margin-top: 20px;">
        <el-form :model="form">
            <el-form-item label="規格">
                <el-select v-model="form.spec">
                    <el-option :key="0" value="單一規格"/>
                </el-select>
            </el-form-item>
            <el-form-item label="數量">
                <el-select v-model="form.qty">
                    <el-option v-for="i in 10" :key="i" :value="i"/>
                </el-select>
            </el-form-item>
        </el-form>
        <div>
            {{ DialogData.description}}
        </div>
    </el-col>
    </el-row>
        <div  class="DialogPriceItem">原價:{{ DialogData.price}}元</div>
        <div  class="DialogPriceItem" v-show="form.discount<1">折扣:{{ form.discount*10 }} 折</div>
        <div  class="DialogPriceItem" >購買價格:{{ DialogData.price * form.qty * form.discount }}元</div>
        <div  class="DialogPriceItem" v-show="form.discount<1">節省價格:{{ Math.round((DialogData.price * form.qty )-(DialogData.price * form.qty * form.discount)) }}元</div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisable = false">取消</el-button>
                <el-button type="primary" @click="PutProductInCart(DialogData,form)">
                加入購物車
                </el-button>
            </span>
        </template>     
    </el-drawer>           
    <!-- </el-dialog> -->
</template>

<script setup>
import { getAllProducts ,getAllCategories , getProductInSpecCategory} from "../apis/apiProducts";
import { reactive, computed, ref, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import { useShippingCartStore } from "../store/ShoppingCart";


const Products = reactive({});
const Categories = ref([]);
const loading = ref(true);
const useCarts = useShippingCartStore();
// 顯示訂單確認視窗
const centerDialogVisable = ref(false);
let DialogData = reactive({id:"",title:"",price:0,image:"",category:"" ,description:""});
const form = reactive({
    qty:1,
    spec:'單一規格',
    discount:0.9,
})
// get All Product
async function getProduct() {
    await getAllProducts()
        .then((res) => {
            Products.value = res.data;
            console.log(res);
            loading.value = false;
        })
        .catch((error) => {
            console.log(error);
        });
}

//get All Categories
async function getCategories(){
    await getAllCategories().then((res) =>{
        Categories.value = res.data;
        console.log(Categories);
    })
    .catch((error)=>{
        ElMessage.error("Opps!!", error);
    })
}


const ProductsData = computed(() => Products.value);
const CategoriesData = computed(() => Categories.value);
// const ProdCategorics = computed(()=> Categories.value);
watchEffect(async () =>{
    getProduct();
    getCategories();
});

function getProductInSpecificCategory(category){
    getProductInSpecCategory(category).then((res)=>{
        Products.value = res.data;
        console.log(res.data);
    }).catch(err =>{
        ElMessage.error(err);
    })
    console.log(category);
}

function ConfirmPutInCart(Product){
    const {id,title,price,image,category, description } = Product;
    DialogData.id = id;
    DialogData.title = title;
    DialogData.price = price;
    DialogData.image = image;
    DialogData.category = category;
    DialogData.description = description ;
    // show Dialog in center
    centerDialogVisable.value = true;
}

function PutProductInCart(product,form){
    ElMessage({
        showClose: true,
        type:'success',
        message: product.id +":" + product.title + ", price:" + product.price +",Qty:" + form.qty + "("  + form.discount +")",
    })

    // 確認訂購商品是否重複，若重複就加上去或者警告異常
    
    useCarts.pushCart({product,form});
    centerDialogVisable.value = false;
}
</script>

<style scoped>

.ep-bg-purple {
    background-color: #ddd;
}
.grid-content {
    size: 20px;
    border-radius: 4px;
    min-height: 36px;
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

.card-header {
    
  height: 40px;
 
}
.el-card {
    width: 480px;
    margin-bottom: 30px;
}
.box{
    height:100%;
    overflow:hidden;
}

/* dialog css */
.DialogPriceItem{
    text-align: right;
    background-color: #eee;
    color: red;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 40px;
}
</style>

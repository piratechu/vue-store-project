<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
        router
    >
        <el-menu-item index="/"><svgIcon name="vue" :size="40" /></el-menu-item>

        <el-menu-item index="/product">All Product</el-menu-item>
        <el-sub-menu index="2">
            <!-- #title is slot -->
            <template #title>權限管理</template>
            <!-- index 可以配合 router name來指定 load component or view -->
            <el-menu-item index="2-1">Table測試</el-menu-item>
            <el-menu-item index="2-2">程式編輯</el-menu-item>
            <el-menu-item index="2-3">錯誤日誌</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>客戶管理</template>
            <el-menu-item index="3-1">客戶清單列表</el-menu-item>
            <el-menu-item index="3-2">Layout布局</el-menu-item>
            <el-menu-item index="3-3">購物車清單</el-menu-item>
            <el-menu-item index="/about">關於</el-menu-item>
        </el-sub-menu>
        <div class="userAction">
            <span class="shoppingCart">
                <el-badge :value="useCarts.getCartsItmes()" :max="10" class="badgeitem">
                    <el-icon size="25" @click="showCarts"><ShoppingCart /></el-icon>
                </el-badge>
            </span>
            <el-dropdown>
                <span class="el-dropdown-user">
                    <el-avatar :size="25" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                    <el-icon><arrow-down /></el-icon>
                </span>

                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>{{ userInfo.username }}</el-dropdown-item>
                        <el-dropdown-item>{{ userInfo.phone }}</el-dropdown-item>
                        <el-dropdown-item>{{ userInfo.email }}</el-dropdown-item>
                        <el-dropdown-item>Ver. {{ appVer }}</el-dropdown-item>
                        <el-dropdown-item divided @click="logoff">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-menu>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import { getUserInfo } from "../../apis/apiLogin";
import { useTokenStore } from "../../store/Token";
import { useShippingCartStore } from "../../store/ShoppingCart";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

const activeIndex = ref("1");
const useToken = useTokenStore();
const useCarts = useShippingCartStore();
const userInfo = reactive({ username: "", phone: "", email: "" });
const router = useRouter();
const appVer = inject("appVer");
const cartDrawer = ref(false);
const cartContent = useCarts.getCartsList();
function handleSelect(key, keyPath) {
    console.log(key, keyPath);
}

async function getUser() {
    await getUserInfo(Math.floor(Math.random() * 10) + 1)
        .then((res) => {
            // console.log(res);
            userInfo.username = res.data.username;
            userInfo.phone = res.data.phone;
            userInfo.email = res.data.email;
            console.log("userInfo:", userInfo.username);
        })
        .catch((error) => {});
}

async function logoff() {
    //詢問是否確認
    await ElMessageBox.confirm("確定要登出嗎?", "退出詢問", {
        confirmButtonText: "確定",
        CancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            ElMessage({
                type: "success",
                message: "成功退出",
            });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "取消退出",
            });
            // 停止後續執行
            return new Promise(() => {});
        });
    //執行退出
    // 清空 pinia 的 token 資料
    useToken.resetToken();

    //清空 token 轉回 login
    router.push({ name: "login" });
}

function showCarts() {
    ElMessage({
        type: "info",
        message: "查看購物車清單",
    });
    router.push({ name: "3-3" });
}

onMounted(() => {
    getUser();
});
</script>

<style scoped>
.el-header {
    display: flex;
    align-items: center;
    justify-items: center;
}

.el-menu-demo {
    width: 100%;
    /* background-color: gold; */
}

.userAction {
    display: flex;
    /* background-color: blue; */
    margin-left: auto;
    margin-right: 50px;
}

.badgeitem {
    margin-top: 10px;
    margin-right: 10px;
}
.shoppingCart {
    cursor: pointer;
    display: flex;
    align-items: center;
    outline: unset;
    position: relative;
    padding-right: 10px;
}

.el-dropdown {
    position: relative;
}

.el-dropdown-user {
    cursor: pointer;
    display: flex;
    align-items: center;
    outline: unset;
}

/* https://blog.csdn.net/lllfy137/article/details/122367023 */
/* menu 樣式變更範例 */
</style>

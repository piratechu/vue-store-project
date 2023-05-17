import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

//1. define route component
// import ProductList from "../components/ProductList.vue";
import HelloWorld from "../components/HelloWorld.vue";

//導入 pinia token
import { useTokenStore } from "../store/token";

const routes = [
    { path: "/login", name: "login", component: () => import("../Views/LoginView.vue"), meta: { title: "登入" } },
    {
        path: "/",
        name: "",
        component: () => import("../Views/HomeView.vue"),
        meta: { title: "少商採購" },
        children: [
            { path: "", name: "home", component: () => import("../views/IndexView.vue"), meta: { title: "首頁" } },
            {
                path: "/product",
                name: "product",
                component: () => import("../components/ProductList.vue"),
                meta: { title: "產品清單", Auth: true },
            },
            {
                path: "/:pathMath(.*)*",
                name: "NotFound",
                component: () => import("../components/NotFound.vue"),
                meta: { title: "404" },
            },
        ],
    },
    {
        path: "/Auth",
        name: "auth",
        component: () => import("../Views/HomeView.vue"),
        meta: { title: "權限管理" },
        children: [
            {
                path: "/2-1",
                name: "2-1",
                component: () => import("../views/TableView.vue"),
                meta: { title: "Table測試" },
            },
            {
                path: "/2-2",
                name: "2-2",
                component: () => import("../views/CodeEditView.vue"),
                meta: { title: "程式碼編輯" },
            },
            {
                path: "/2-3",
                name: "2-3",
                component: () => import("../views/ErrorLog.vue"),
                meta: { title: "錯誤碼攔截" },
            },
        ],
    },
    {
        path: "/Customer",
        name: "Customer",
        component: () => import("../Views/HomeView.vue"),
        meta: { title: "客戶管理" },
        children: [
            {
                path: "/3-1",
                name: "3-1",
                component: () => import("../views/UserListView.vue"),
                meta: { title: "客戶清單列表" },
            },
            {
                path: "/3-2",
                name: "3-2",
                component: () => import("../views/LayoutView.vue"),
                meta: { title: "layout布局" },
            },
            {
                path: "/3-3",
                name: "3-3",
                component: () => import("../views/ShoppingCartView.vue"),
                meta: { title: "layout布局" },
            },
            { path: "/about", name: "about", component: HelloWorld, meta: { title: "關於我們" } },
        ],
    },
];

const router = createRouter({
    model: "history",
    // import.meta.env.BASE_URL from vite.config.js => base define
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

//前置守衛
router.beforeEach(async (to, form, next) => {
    const useToken = useTokenStore();
    console.log("vue router:", useToken.Token);
    if (to.matched.some((r) => r.meta.Auth) && !useToken.Token) {
        next({ name: "login" });
        // 如果想要用跳轉模式
        // next({name:'login',query:{redicect:to.fullPath}});
        // 頁面可以使用 useRoute => route.query.redirect 的方式轉換目錄
    } else {
        next();
    }
});

router.afterEach(() => {});

export default router;

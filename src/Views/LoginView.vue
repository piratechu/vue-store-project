<template>
    <div class="login">
        <el-form :model="form" label-width="120px" label-position="top" :rules="rules">
            <h2>登入系統</h2>
            <el-form-item label="登入帳號" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="密碼" prop="password">
                <el-input v-model="form.password" type="password" show-password />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">登入</el-button>
                <el-button type="warning" @click="onCancel">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { reactive, toRef } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { login } from "../apis/apiLogin";
import { useTokenStore } from "../store/Token";

export default {
    setup() {
        const router = useRouter();
        const useToken = useTokenStore();
        const form = reactive({
            name: "",
            password: "",
        });
        if (useToken.Token) {
            router.push({ name: "home" });
        }

        async function onSubmit() {
            //call login api, fake api
            await login(JSON.stringify({ username: "mor_2314", password: "83r5^_" }))
                .then((res) => {
                    ElMessage.success("登入成功");
                    //keep token
                    useToken.Token = res.data.token;
                    console.log("token:", useToken.Token);
                    router.push({ name: "home" });
                })
                .catch((error) => {
                    console.log("error:", error.message);
                    ElMessage({
                        showClose: true,
                        message: "登入失敗:" + error.message,
                        type: "error",
                    });
                });
        }
        function onCancel() {
            ElMessage.warning("取消登入，回主頁面");
            router.push({ name: "home" });
        }
        const rules = reactive({
            name: [
                { required: true, message: "Please input User Name", trigger: "blur" },
                { min: 5, max: 10, message: "Length should be 5 to 10", trigger: "blur" },
            ],
            password: [
                { required: true, message: "Please input password", trigger: "blur" },
                { min: 5, max: 20, message: "Length should be 5 to 20", trigger: "blur" },
            ],
        });

        return { form, onSubmit, onCancel, rules };
    },
};
</script>

<style scoped>
.login {
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
}
.el-form {
    width: 300px;
    background-color: #eee;
    padding: 30px;
    border-radius: 10px;
}

.el-button {
    margin-left: auto;
    margin-right: auto;
    width: 120px;
}
</style>

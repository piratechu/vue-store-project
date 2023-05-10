import { ElLoading } from "element-plus";

let loading = null;
function openLoading() {
    loading = ElLoading.service({
        lock: true,
        text: "Loading....",
        spinner: "el-icon-loading",
        background: "rgba(0,0,0,0.7)",
    });
    setTimeout(() => {}, 3000);
}

function closeLoading() {
    loading.close();
}
export { openLoading, closeLoading };

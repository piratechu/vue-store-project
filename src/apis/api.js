// 設定攔截器
// 統一管理 web api 進入點
// https://fakestoreapi.com 的 web api = product 統一進入點

import axios from "axios";

// 自定義創建 axios instance 的默認值
// 參考 : https://ithelp.ithome.com.tw/articles/10230336

const instance = axios.create({
    //官網更多的設定說明 https://github.com/axios/axios#request-config
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 6000,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
});

// request interceptors，攔截請求
// 此處將 axios 建立的 instance
instance.interceptors.request.use(
    function (config) {
        //在 request 送出之前可以作一些設定的調整
        return config;
    },
    function (error) {
        //如果 request 有錯誤可以回傳 promise 錯誤
        return Promise.reject(error);
    }
);

// reponse interceptors ，攔截回應
instance.interceptors.response.use(
    function (reponse) {
        //do something with reponse data
        return reponse;
    },
    function (error) {
        //do something with reponse error
        if (error.response) {
            switch (error.response.status) {
                //4xx Status Codes (Client Error)
                case 400:
                    console.log(
                        "400 Bad Request:The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications."
                    );
                case 404:
                    console.log("404 Not Found:The server can not find the requested resource.");
                    //go to 404 page
                    break;
                // 5xx Status Codes (Server Error)
                case 500:
                    console.log(
                        "500 Internal Server Error:The server encountered an unexpected condition that prevented it from fulfilling the request."
                    );
                    // go to 500 page
                    break;
                default:
                    console.log("unknow error:", error.message);
            }
        }
        return Promise.reject(error);
    }
);

// 封裝 instance
export default function (method, url, data = null, config) {
    method = method.toLowerCase();
    switch (method) {
        case "post":
            return instance.post(url, data, config);
        case "get":
            return instance.get(url, { params: data });
        case "delete":
            return instance.delete(url, { params: data });
        case "put":
            return instance.put(url, data);
        case "patch":
            return instance.patch(url, data);
        default:
            console.log(`未知的 method: ${method}`);
            return false;
    }
}

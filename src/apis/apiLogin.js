// 管理 product 相關的 api
//restful api 寫法
import api from "./api";

export const login = (data) => api("post", "/auth/login", data);
export const getUserInfo = (index) => api("get", "/users/" + index);

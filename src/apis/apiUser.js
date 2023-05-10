// 管理 product 相關的 api
//restful api 寫法
import api from "./api";

export const getAllUsers = () => api("get", "/users");
export const getSingleUser = (data) => api("get", "/users", data);
export const getLimitUsers = (data) => api("get", "/users", data);

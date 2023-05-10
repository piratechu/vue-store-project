// 管理 cart 相關 api
import api from "./api";

export const addNewCart = (data) => api("get", "/carts", data);
export const getAllCart = () => api("post", "carts");

// 管理 product 相關的 api
//restful api 寫法
import api from "./api";

export const getAllProducts = () => api("get", "/products");
export const getSingleProduct = (data) => api("get", "/products", data);
export const getAllCategories = () => api("get", "/products/categories");
export const getProductInSpecCategory = (category) => api("get", "/products/category/" + category);

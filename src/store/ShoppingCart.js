import { defineStore } from "pinia";
import { ref } from "vue";

//setup store, vue composition api setup function
export const useShippingCartStore = defineStore("shoppingcart", () => {
    const carts = ref([]);
    const pushCart = (product) => {
        carts.value.push(product);
        console.log(carts.value);
    };
    const clearShoppingCarts = () => {
        carts.value.splice(0);
    };

    const getCartsList = () => {
        return carts;
    };

    const getCartsItmes = () => {
        console.log("cartSize:", carts.value.length);
        return carts.value.length;
    };
    return { pushCart, clearShoppingCarts, getCartsItmes, getCartsList };
});

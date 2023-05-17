import { defineStore } from "pinia";
import { ref } from "vue";

//setup store, vue composition api setup function
export const useShippingCartStore = defineStore("shoppingcart", () => {
    const carts = ref([]);
    const pushCart = (product) => {
        carts.value.push(product);
        console.log("carts result:", carts.value);
    };
    const clearShoppingCarts = () => {
        carts.value.splice(0);
    };

    const getCartsList = () => {
        // console.log("carts list", carts.value);
        return carts.value;
    };

    const getCartsItmes = () => {
        // console.log("cartSize:", carts.value.length);
        return carts.value.length;
    };

    const moveOutCarts = (id) => {
        carts.value = carts.value.filter((el) => {
            console.log(el.product.id);
            return el.product.id !== id;
        });
    };
    return { pushCart, clearShoppingCarts, getCartsItmes, getCartsList, moveOutCarts };
});

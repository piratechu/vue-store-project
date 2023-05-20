import { defineStore } from "pinia";
import { ref } from "vue";

//setup store, vue composition api setup function
export const useFavoriteStore = defineStore(
    "favorite",
    () => {
        const Favorite = ref([]);

        const getFavoriteList = () => {
            return Favorite.value;
        };

        const pushFavorite = (id) => {
            Favorite.value.push(id);
        };
        return { Favorite, getFavoriteList, pushFavorite };
    },
    {
        persist: [{ storage: localStorage, paths: ["Favorite"] }],
    }
);

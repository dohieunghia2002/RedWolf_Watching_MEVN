import { defineStore } from 'pinia';

export const useFavoriteStore = defineStore('favorite', {
    state: () => {
        return {
            favorites: []
        }
    }
});


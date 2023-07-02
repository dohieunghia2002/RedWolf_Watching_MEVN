import { defineStore } from 'pinia';
import favoriteService from '@/services/favorite.service.js';
import mediaService from '@/services/media.service.js';

export const useFavoriteStore = defineStore('favorite', {
    state: () => {
        return {
            favorites: []
        }
    },

    actions: {
        async detailFavoritesUser(token, id) {
            const res = await favoriteService.detailFavoritesMember(token, id);
            const result = [];

            this.favorites = await res.mediaID;
            for (let i = 0; i < this.favorites.length; i++) {
                const element = await this.favorites[i];
                const media = await mediaService.getDetail(element);
                result.push(media);
            }
            return result;
        }
    }
});


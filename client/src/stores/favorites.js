import { defineStore } from 'pinia';

import favoritesService from '@/services/favorites.service.js';

export const useFavoritesStore = defineStore('favorites', {
    state: () => {
        return {
            favorites: null
        }
    },

    getters: {
        medias() {
            return this.favorites.mediaID;
        }
    },

    actions: {
        getMediaIDRemove(media) {
            return media._id;
        },

        async markFavorited(id) {
            if (this.favorites && this.medias.length > 0) {
                const check = await this.medias.includes(id);

                if (check) {
                    document.getElementsByClassName('font-favorites')[0].classList.add('active-favorites');
                }
            }
        },

        async pushFavorites(accountID, mediaId, token) {
            var datas = {
                userID: accountID,
                mediaID: mediaId
            }
            const res = await favoritesService.push(datas, token);
            if (res.status == 201) {
                document.getElementsByClassName('font-favorites')[0].classList.add('active-favorites');
                this.favorites = await favoritesService.getList(token);
            }
        }
    }
});

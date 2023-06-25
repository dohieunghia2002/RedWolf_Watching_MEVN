import { defineStore } from 'pinia';

import favoritesService from '@/services/favorites.service.js';

export const useFavoritesStore = defineStore('favorites', {
    state: () => {
        return {
            favorites: null,
            listMedia: [],
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

        async detailMedia(token) {
            const data = {
                userID: this.favorites.userID,
                mediaID: this.favorites.mediaID
            }
            this.listMedia = await favoritesService.details(data, token);
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

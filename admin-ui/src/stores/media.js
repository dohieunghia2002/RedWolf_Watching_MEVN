import { defineStore } from 'pinia';
import mediaService from '@/services/media.service.js';

export const useMediaStore = defineStore('media', {
    state: () => {
        return {
            media: null,
            listMovies: [],
            listSeries: []
        }
    },

    getters: {
        score() {
            if (this.media.numberRater > 0) {
                return Math.round(this.media.rate / this.media.numberRater);
            }
            return 0;
        },

        numberCarousel() {
            return this.media.posters.length - 2;
        },

        listCarousel() {
            return this.media.posters.slice(2);
        }
    },

    actions: {
        async getList() {
            this.listMovies = await mediaService.popularMovies();
            this.listSeries = await mediaService.popularSeries();
        }
    }
});
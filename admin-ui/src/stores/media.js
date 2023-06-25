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

    actions: {
        async getList() {
            this.listMovies = await mediaService.popularMovies();
            this.listSeries = await mediaService.popularSeries();
        }
    }
});
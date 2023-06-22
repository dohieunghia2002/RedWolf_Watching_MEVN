import { defineStore } from 'pinia';

import { pathImgMedia, pathImgCast } from '@/assets/staticPath/index.js';


export const useMediaStore = defineStore('media', {
    state: () => {
        return {
            media: null,
            popularMovies: [],
            ratedMovies: [],
            popularTVSeries: [],
            ratedSeries: [],
        }
    },

    getters: {
        scoreMediaIntro() {
            if (this.media.numberRater > 0) {
                return Math.round(this.media.rate / this.media.numberRater);
            }
            return 0;
        },

        pathImageMedia() {
            return pathImgMedia();
        },

        pathCast() {
            return pathImgCast();
        },
    },
})
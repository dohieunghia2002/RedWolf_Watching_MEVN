import { defineStore } from 'pinia';
import mediaService from '@/services/media.service.js';

export const useMediaStore = defineStore('media', {
    state: () => {
        return {
            media: null,
            formCreate: {
                userID: '',
                name: '',
                description: '',
                posters: [
                    '',
                    '',
                ],
                category: '',
                genre: [
                    ''
                ],
                language: '',
                year: 1999,
                eppisodes: [
                    {
                        videoUrl: '',
                        number: 1
                    }
                ],
                rate: 0,
                numberOfReviews: 0,
                casts: [
                    {
                        "name": "",
                        "character": "",
                        "avatar": ""
                    }
                ]
            },
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
    },

    actions: {
        async getList() {
            this.listMovies = await mediaService.popularMovies();
            this.listSeries = await mediaService.popularSeries();
        }
    }
});
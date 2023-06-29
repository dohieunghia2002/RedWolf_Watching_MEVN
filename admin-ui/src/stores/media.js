import { defineStore } from 'pinia';
import mediaService from '@/services/media.service.js';

export const useMediaStore = defineStore('media', {
    state: () => {
        return {
            media: null,
            optionGenre: [
                'Action',
                'Adventure',
                'Music',
                'Crime',
                'Mystery',
                'Thriller',
                'Drama',
                'Family',
                'History',
                'Sci-Fi',
                'Comedy',
                'Romance',
                'Biography',
                'Fantasy'
            ],
            formMedia: {
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
                numberRater: 0,
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
        scoreInEditView() {
            if (this.formMedia.numberRater > 0) {
                return Math.round(this.formMedia.rate / this.formMedia.numberRater);
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
import { defineStore } from 'pinia';
import reviewService from '@/services/review.service.js';

import { pathImgMedia } from '@/assets/staticPath/index.js';

export const useReviewStore = defineStore('review', {
    state: () => {
        return {
            reviewsMedia: [],
            formComment: {},
            reviewsUser: []
        }
    },

    getters: {
        pathImageMedia() {
            return pathImgMedia()
        }
    },

    actions: {
        async createComment(userId, mediaId, token) {
            var formData = {
                userID: userId,
                mediaID: mediaId,
                ...this.formComment
            }
            return await reviewService.post(formData, token);
        },
    },
})
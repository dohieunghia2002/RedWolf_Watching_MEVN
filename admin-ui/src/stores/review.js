import { defineStore } from 'pinia';

export const useReviewStore = defineStore('review', {
    state: () => {
        return {
            reviews: []
        }
    }
});


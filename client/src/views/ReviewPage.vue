<template>
    <div class="review">
        <div class="container mt-4">
            <div class="categories col-12">
                <h4 class="title-menu text-uppercase">
                    Your Review
                    <span class="separate"></span>
                </h4>
            </div>

            <div class="my-4 list-review" v-for="(review, index) in reviewStore.reviewsUser" :key="index">
                <div class="review-item">
                    <img :src="review.mediaID.posters[1]" class="review-poster-media" alt="poster media">
                    <div class="review-detail flex-grow-1 text-light mx-3">
                        <h4 class="my-2">{{ review.mediaID.name }}</h4>
                        <p>{{ review.date.split('T')[0] }}</p>
                        <p v-if="review.content">{{ review.content }}</p>
                        <span class="appreciate" v-if="review.rate > 0">
                            <font-awesome-icon :icon="['fas', 'trophy']" class="text-warning" />
                            {{ review.rate }}/100
                        </span>
                    </div>

                    <button type="button" class="btn btn-remove p-0 rounded-0 text-light" data-toggle="tooltip"
                        data-placement="top" @click="removeCommet(review._id)">
                        Remove <font-awesome-icon :icon="['fas', 'trash-alt']" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user.js';
import { useReviewStore } from '@/stores/reviews.js';

import reviewService from '@/services/review.service.js';

export default {
    setup() {
        const userStore = useUserStore();
        const reviewStore = useReviewStore();
        return {
            userStore,
            reviewStore
        }
    },

    methods: {
        async handleSetValue() {
            const userId = this.userStore.account._id;
            const token = this.userStore.account.token;
            this.reviewStore.reviewsUser = await reviewService.reviewsUser(userId, token);
        },

        async removeCommet(id) {
            const res = await reviewService.remove(id, this.userStore.account.token);
            await this.handleSetValue();
        }
    },

    async created() {
        await this.handleSetValue();
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/review.scss';
</style>
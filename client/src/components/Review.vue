<template>
    <div class="container-fluid mx-0 mt-4 py-1 media-review">
        <div class="container">
            <div class="row">
                <div class="categories">
                    <h4 class="col-md-12 title-menu">
                        REVIEWS
                        <span class="separate"></span>
                    </h4>
                </div>
                <span class="famille"></span>
            </div>

            <div class="row evaluation-input" v-if="userStore.isLoggedin">
                <div class="col-lg-1">
                    <Avatar :fullName="userStore.account.fullName" style="width: 60px; height: 60px; padding: 3px 2px;" />
                </div>

                <div class="col-lg-11">
                    <div class="comment ml-3 w-100">
                        <div class="comment-header w-100">
                            <h5 class="name-user">{{ userStore.account.fullName }}</h5>
                        </div>
                        <form method="POST" class="w-75" @submit.prevent="postComment">
                            <textarea class="comment-input small text-justify w-100" rows="3"
                                v-model="reviewStore.formComment.content">
                                </textarea>
                            <div class="form-group row my-2">
                                <div class="col-9 p-0">
                                    <label class="col-form-label form-control-label text-light mr-2">
                                        <font-awesome-icon :icon="['fas', 'trophy']" class="text-warning" />
                                        Appreciate
                                    </label>
                                    <input type="number" placeholder="?/100" id="appreciate" min="0" max="100"
                                        v-model="reviewStore.formComment.rate">
                                </div>
                                <div class="col-3 p-0">
                                    <div class="d-flex justify-content-end w-100">
                                        <input type="reset" class="btn btn-secondary mr-2" value="Cancel">
                                        <input type="submit" class="btn btn-primary" value="Save Changes">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div v-for="(review, index) in this.reviewStore.reviewsMedia" :key="index">
                <div class="row evaluation" v-if="review.content">
                    <div class="col-lg-1">
                        <Avatar :fullName="review.userID.fullName" :key="review.userID.fullName"
                            style="width: 60px; height: 60px; padding: 3px 2px;" />
                    </div>

                    <div class="col-lg-11">
                        <div class="comment ml-3 w-100">
                            <div class="comment-header w-100">
                                <h5 class="name-user">{{ review.userID.fullName }}</h5>
                                <div class="d-flex align-items-center">
                                    <span class="date">{{ review.date.split('T')[0] }}</span>
                                    <button class="btn btn-danger btn-delete rounded-0 p-0" type="button"
                                        data-toggle="tooltip" data-placement="top" title="Delete"
                                        @click="removeComment(review._id)"
                                        v-if="userStore.account != null && review.userID._id === userStore.account._id">
                                        <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-danger" />
                                    </button>
                                </div>
                            </div>
                            <p class="comment-content small text-justify">{{ review.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Avatar from './Avatar.vue';

import { useUserStore } from '@/stores/user.js';
import { useReviewStore } from '@/stores/reviews.js';
import { useMediaStore } from '@/stores/media.js';

import reviewService from '@/services/review.service.js';
import mediaService from '@/services/media.service.js';

export default {
    setup() {
        const userStore = useUserStore();
        const reviewStore = useReviewStore();
        const mediaStore = useMediaStore();
        return {
            userStore,
            reviewStore,
            mediaStore
        }
    },

    components: { Avatar },

    methods: {
        async postComment() {
            const userId = this.userStore.account._id;
            const mediaId = this.$route.params.id;
            const token = this.userStore.account.token;
            const res = await this.reviewStore.createComment(userId, mediaId, token);
            if (res.status == 201) {
                this.reviewStore.formComment = {};
                this.mediaStore.media = await mediaService.getDetail(mediaId);
                this.reviewStore.reviewsMedia = await reviewService.getReviewsMedia(mediaId);
            }
        },

        async removeComment(id) {
            const mediaId = this.$route.params.id;
            const res = await reviewService.remove(id, this.userStore.account.token);
            this.mediaStore.media = await mediaService.getDetail(mediaId);
            this.reviewStore.reviewsMedia = await reviewService.getReviewsMedia(mediaId);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/detailMedia.scss';
</style>
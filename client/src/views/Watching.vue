<template>
    <div class="watching my-4" v-if="mediaStore.media">
        <div class="container">
            <div class="player">
                <div class="embed">
                    <center>
                        <iframe class="video" :src="mediaStore.media.eppisodes[curNoEp - 1].videoUrl" height="520"
                            width="1080" title="iframe video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen style="border:none;" v-if="!display">
                        </iframe>

                        <video class="video border-0" width="1080" height="520"
                            :src="mediaStore.media.eppisodes[curNoEp - 1].videoUrl" controls v-else>
                        </video>
                    </center>
                </div>
            </div>

            <div class="annotate my-4">
                <h4 class="annotate-name">{{ mediaStore.media.name }}</h4>
                <span class="annotate-desc text-light small">
                    {{ mediaStore.media.description }}
                </span>
            </div>

            <ul class="episodes p-0" v-if="mediaStore.media.eppisodes.length > 1">
                <li class="episodes-list" v-for="(ep, index) in mediaStore.media.eppisodes" :key="index">
                    <button class="episodes-list-btn" type="button" @click="choseEp(ep.number)"
                        :class="{ active: curNoEp == ep.number }">
                        {{ index + 1 }}
                    </button>
                </li>
            </ul>
        </div>

        <Review />
    </div>
</template>

<script>
import Review from '@/components/Review.vue';

import { useMediaStore } from '@/stores/media.js';
import { useReviewStore } from '@/stores/reviews.js';

import mediaService from '@/services/media.service.js';
import reviewService from '@/services/review.service.js';

export default {
    components: { Review },

    setup() {
        const mediaStore = useMediaStore();
        const reviewStore = useReviewStore();
        return {
            mediaStore,
            reviewStore
        }
    },

    data() {
        return {
            curNoEp: 1,
            display: false
        }
    },

    methods: {
        choseEp(ep) {
            this.curNoEp = ep;
        },

        async handleSetData() {
            const reqId = this.$route.params.id;
            this.mediaStore.media = await mediaService.getDetail(reqId);
            this.reviewStore.reviewsMedia = await reviewService.getReviewsMedia(this.mediaStore.media._id);

            if (this.mediaStore.media.eppisodes[this.curNoEp - 1].videoUrl.includes('.mp4')) {
                this.display = true
            }
            else {
                this.display = false
            }
        }
    },

    async created() {
        await this.handleSetData();
    }
}
</script>

<style lang="scss" scoped>
.video {
    object-fit: contain;
}

.annotate {
    .annotate-name {
        color: #ddd;
    }
}

.episodes {
    list-style: none;

    .episodes-list {
        display: inline-block;
        text-align: center;
        padding: 5px !important;
        margin: 0 !important;
        width: 7%;

        .episodes-list-btn {
            background-color: rgba(4, 4, 141, 0.35);
            padding: 8px 25px;
            color: #bbb;
            border: 0;
            border-radius: 20%;

            &:hover {
                background-color: rgba(4, 4, 141, 0.8);
            }

            &.active {
                background-color: rgba(4, 4, 141, 1);
            }
        }
    }
}
</style>
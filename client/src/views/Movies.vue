<template>
    <div class="movies" v-if="mediaStore.media && mediaStore.popularMovies.length > 0 && mediaStore.ratedMovies.length > 0">
        <MovieIntro :key="mediaStore.media._id" />

        <div class="container">
            <div class="row stored-movies">
                <div class="col-md-12 categories">
                    <div>
                        <h4 class="title-menu">
                            LIST MOVIES
                            <span class="separate"></span>
                        </h4>
                    </div>
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <button class="btn-transfer-mode text-uppercase text-white rounded-0 active" aria-current="page"
                                data-target="#popular" data-toggle="tab">Popular</button>
                        </li>
                        <li class="nav-item">
                            <button class="btn-transfer-mode text-uppercase text-white rounded-0" data-target="#rated"
                                data-toggle="tab">Rated</button>
                        </li>
                    </ul>
                </div>
                <div class="tab-content">
                    <div class="tab-pane active" id="popular">
                        <div class="sections row list">
                            <template v-for="(movie, index) in mediaStore.popularMovies" :key="index">
                                <div class="list-item col-2 p-0">
                                    <router-link :to="{ name: 'detail', params: { id: movie._id } }">
                                        <div class="card h-100">
                                            <img class="card-img-top h-100" :src="movie.posters[1]" alt="Card image cap" />

                                            <div class="card-body">
                                                <div class="empty-space"></div>
                                                <div>
                                                    <h4 class="card-title">{{ movie.name }}</h4>
                                                    <p class="card-text">{{ movie.year }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </template>
                        </div>
                    </div>

                    <div class="tab-pane" id="rated">
                        <div class="sections row list">
                            <template v-for="(movie, index) in mediaStore.ratedMovies" :key="index">
                                <div class="list-item col-2 p-0">
                                    <router-link :to="{ name: 'detail', params: { id: movie._id } }">
                                        <div class="card h-100">
                                            <img class="card-img-top h-100" :src="movie.posters[1]" alt="Card image cap" />

                                            <div class="card-body">
                                                <div class="empty-space"></div>
                                                <div>
                                                    <h4 class="card-title">{{ movie.name }}</h4>
                                                    <p class="card-text">{{ movie.year }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MovieIntro from '@/components/MovieIntro.vue';

import mediaService from '@/services/media.service.js';
import { useMediaStore } from '@/stores/media.js';

export default {
    components: { MovieIntro },
    setup() {
        const mediaStore = useMediaStore();
        return {
            mediaStore
        }
    },

    methods: {
        async handleSetData() {
            const reqId = this.$route.params.id;
            if (reqId) {
                this.mediaStore.media = await mediaService.getDetail(reqId);
            }
            else this.mediaStore.media = await mediaService.getRandMovie(reqId);
        }
    },

    async created() {
        await this.handleSetData();
    },
}
</script>

<style lang="scss" scoped>
.nav-tabs {
    border: none;
}
</style>
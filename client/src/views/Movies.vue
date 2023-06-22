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
                                <router-link :to="{ name: 'detail', params: { id: movie._id } }">
                                    <div class="card">
                                        <img class="card-img-top" :src="mediaStore.pathImageMedia + movie.posters[1]"
                                            alt="Card image cap" />

                                        <div class="card-body">
                                            <div class="empty-space"></div>
                                            <div>
                                                <h4 class="card-title">{{ movie.name }}</h4>
                                                <p class="card-text">{{ movie.year }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </template>
                        </div>
                    </div>

                    <div class="tab-pane" id="rated">
                        <div class="sections row list">
                            <template v-for="(movie, index) in mediaStore.ratedMovies" :key="index">
                                <router-link :to="{ name: 'detail', params: { id: movie._id } }">
                                    <div class="card">
                                        <img class="card-img-top" :src="mediaStore.pathImageMedia + movie.posters[1]"
                                            alt="Card image cap" />

                                        <div class="card-body">
                                            <div class="empty-space"></div>
                                            <div>
                                                <h4 class="card-title">{{ movie.name }}</h4>
                                                <p class="card-text">{{ movie.year }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
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
// import favoritesService from '@/services/favorites.service.js';

import { useMediaStore } from '@/stores/media.js';
// import { useUserStore } from '@/stores/user.js';
// import { useFavoritesStore } from '@/stores/favorites.js';

export default {
    components: { MovieIntro },
    setup() {
        const mediaStore = useMediaStore();
        //         const favoritesStore = useFavoritesStore();
        //         const userStore = useUserStore();
        return {
            //             userStore,
            //             favoritesStore,
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

        //         if (this.userStore.isLoggedin) {
        //             const token = await this.userStore.account.token;
        //             this.favoritesStore.favorites = await favoritesService.getList(token);
        //             this.favoritesStore.detailMedia(token);
        //         }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/movies.scss';
</style>
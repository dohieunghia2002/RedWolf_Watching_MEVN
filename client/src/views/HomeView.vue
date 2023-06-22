<template>
    <div class="home" v-if="mediaStore.media &&
        mediaStore.popularMovies.length > 0 && mediaStore.ratedMovies.length > 0 &&
        mediaStore.popularTVSeries.length > 0 && mediaStore.ratedSeries.length > 0">
        <MovieIntro :key="mediaStore.media._id" />

        <div class="container mt-4 pt-4">
            <div class="row popular-movies">
                <div class="categories">
                    <h4 class="col-md-12 title-menu">
                        POPULAR MOVIES
                        <span class="separate"></span>
                    </h4>
                </div>
                <span class="famille"></span>

                <div class="sections row list">
                    <div v-for="(item, index) in  4 " :key="index">
                        <router-link :to="{ name: 'detail', params: { id: mediaStore.popularMovies[index]._id } }">
                            <div class="card">
                                <img class="card-img-top"
                                    :src="mediaStore.pathImageMedia + mediaStore.popularMovies[index].posters[1]"
                                    alt="Poster" />

                                <div class="card-body">
                                    <div class="empty-space"></div>
                                    <div>
                                        <h4 class="card-title">{{ mediaStore.popularMovies[index].name }}</h4>
                                        <p class="card-text">{{ mediaStore.popularMovies[index].year }}</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="row popular-tv-series">
                <div class="categories">
                    <h4 class="col-md-12 title-menu">
                        POPULAR SERIES
                        <span class="separate"></span>
                    </h4>
                </div>
                <span class="famille"></span>

                <div class="sections row list">
                    <div v-for="( item, index ) in  4 " :key="index">
                        <router-link :to="{ name: 'detail', params: { id: mediaStore.popularTVSeries[index]._id } }">
                            <div class="card">
                                <img class="card-img-top"
                                    :src="mediaStore.pathImageMedia + mediaStore.popularTVSeries[index].posters[1]"
                                    alt="Card image cap" />

                                <div class="card-body">
                                    <div class="empty-space"></div>
                                    <div>
                                        <h4 class="card-title">{{ mediaStore.popularTVSeries[index].name }}</h4>
                                        <p class="card-text">{{ mediaStore.popularTVSeries[index].year }}</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="row rated-movies">
                <div class="categories">
                    <h4 class="col-md-12 title-menu">
                        TOP RATED MOVIES
                        <span class="separate"></span>
                    </h4>
                </div>
                <span class="famille"></span>

                <div class="sections row list">
                    <div v-for="( item, index ) in  4 " :key="index">
                        <router-link :to="{ name: 'detail', params: { id: mediaStore.ratedMovies[index]._id } }">
                            <div class="card">
                                <img class="card-img-top"
                                    :src="mediaStore.pathImageMedia + mediaStore.ratedMovies[index].posters[1]"
                                    alt="Card image cap" />

                                <div class="card-body">
                                    <div class="empty-space"></div>
                                    <div>
                                        <h4 class="card-title">{{ mediaStore.ratedMovies[index].name }}</h4>
                                        <p class="card-text">{{ mediaStore.ratedMovies[index].year }}</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="row rated-series">
                <div class="categories">
                    <h4 class="col-md-12 title-menu">
                        TOP RATED SERIES
                        <span class="separate"></span>
                    </h4>
                </div>
                <span class="famille"></span>

                <div class="sections row list">
                    <div v-for="( item, index ) in  4 " :key="index">
                        <router-link :to="{ name: 'detail', params: { id: mediaStore.ratedSeries[index]._id } }">
                            <div class="card">
                                <img class="card-img-top"
                                    :src="mediaStore.pathImageMedia + mediaStore.ratedSeries[index].posters[1]"
                                    alt="Card image cap" />

                                <div class="card-body">
                                    <div class="empty-space"></div>
                                    <div>
                                        <h4 class="card-title">{{ mediaStore.ratedSeries[index].name }}</h4>
                                        <p class="card-text">{{ mediaStore.ratedSeries[index].year }}</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MovieIntro from '@/components/MovieIntro.vue';

import { useMediaStore } from '@/stores/media.js';
import { useUserStore } from '@/stores/user.js';
// import { useFavoritesStore } from '@/stores/favorites.js';

import mediaService from '@/services/media.service.js';
// import favoritesService from '@/services/favorites.service.js';

export default {
    setup() {
        const mediaStore = useMediaStore();
        const userStore = useUserStore();
        //     const favoritesStore = useFavoritesStore();
        return {
            userStore,
            mediaStore
            //         favoritesStore,
        }
    },

    components: { MovieIntro },

    methods: {
        async handleSetData() {
            const reqId = this.$route.params.id;
            if (reqId) {
                this.mediaStore.media = await mediaService.getDetail(reqId);
            }
            else this.mediaStore.media = await mediaService.getRandMovie();
        }
    },

    async created() {
        await this.handleSetData();

        //     if (this.userStore.isLoggedin) {
        //         const token = await this.userStore.account.token;
        //         this.favoritesStore.favorites = await favoritesService.getList(token);

        //         if (this.favoritesStore.favorites !== null)
        //             this.favoritesStore.detailMedia(token);
        //     }
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/home.scss';
</style>

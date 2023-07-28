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
                            <!-- <template v-for="(movie, index) in mediaStore.popularMovies" :key="index">
                                <div class="list-item col-4 col-md-3 col-lg-2 p-2 mb-2">
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
                            </template> -->
                            <template v-for="(page, index) in pagesNumber()" :key="index">
                                <template
                                    v-for="(film, idx) in mediaStore.popularMovies.slice(indexFirstFilmOfPage(index), indexLastFilmOfPage(index) + 1)"
                                    :key="idx">
                                    <div class="list-item col-4 col-md-3 col-lg-2 p-2 mb-2">
                                        <router-link :to="{ name: 'detail', params: { id: film._id } }">
                                            <div class="card h-100">
                                                <img class="card-img-top h-100" :src="film.posters[1]"
                                                    alt="Card image cap" />

                                                <div class="card-body">
                                                    <div class="empty-space"></div>
                                                    <div>
                                                        <h4 class="card-title">{{ film.name }}</h4>
                                                        <p class="card-text">{{ film.year }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </template>
                            </template>
                        </div>
                    </div>

                    <div class="tab-pane" id="rated">
                        <div class="sections row list">
                            <template v-for="(movie, index) in mediaStore.ratedMovies" :key="index">
                                <div class="list-item col-4 col-md-3 col-lg-2  p-2 mb-2">
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
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><button type="button" @click="" class="page-link" href="#">Previous</button></li>
                    <li v-for="(page) in pagesNumber()" class="page-item"><button type="button" @click="" class="page-link"
                            href="#">{{ page }}</button>
                    </li>
                    <li class="page-item"><button type="button" @click="" class="page-link" href="#">Next</button></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import MovieIntro from '@/components/MovieIntro.vue';

import mediaService from '@/services/media.service.js';
import { useMediaStore } from '@/stores/media.js';
const QUANTITY_FILM_PAGE = 10;

export default {
    components: { MovieIntro },
    setup() {
        const mediaStore = useMediaStore();
        return {
            mediaStore
        }
    },

    computed: {

    },

    methods: {
        async handleSetData() {
            const reqId = this.$route.params.id;
            if (reqId) {
                this.mediaStore.media = await mediaService.getDetail(reqId);
            }
            else this.mediaStore.media = await mediaService.getRandMovie(reqId);
        },

        pagesNumber() { //2
            return Math.ceil(this.mediaStore.popularMovies.length / QUANTITY_FILM_PAGE);
        },

        indexFirstFilmOfPage(idxPage) {
            return idxPage * QUANTITY_FILM_PAGE;
        },

        indexLastFilmOfPage(idxPage) {
            return idxPage * QUANTITY_FILM_PAGE + (QUANTITY_FILM_PAGE - 1);
        },
    },

    async created() {
        await this.handleSetData();
        console.log('pagesNumer', this.pagesNumber(), 'first', this.indexFirstFilmOfPage(0), 'last', this.indexLastFilmOfPage(0));
    },
}
</script>

<style lang="scss" scoped>
.nav-tabs {
    border: none;
}
</style>
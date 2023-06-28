<template>
    <div class="create-media" :key="formCreate">
        <div class="container my-4">
            <div class="categories">
                <h4 class="col-md-12 title-menu text-uppercase">
                    Create media
                    <span class="separate"></span>
                </h4>
            </div>

            <form method="POST" class="text-light" @submit.prevent="handleSubmitMedia">
                <!-- Info general for movie -->
                <div class="form-group row">
                    <label class="col-lg-1 col-form-label form-control-label">Creator</label>
                    <div class="col-lg-3">
                        <input class="form-control" type="text" v-model="formCreate.userID" disabled>
                    </div>

                    <label class="col-lg-1 col-form-label form-control-label">Name</label>
                    <div class="col-lg-4">
                        <input class="form-control" type="text" v-model="formCreate.name">
                    </div>

                    <label class="col-lg-1 col-form-label form-control-label">Category</label>
                    <div class="col-lg-2">
                        <input class="form-control" type="text" placeholder="movie/tv series" v-model="formCreate.category">
                    </div>

                    <div class="space-empty w-100"></div>

                    <label class="col-lg-1 col-form-label form-control-label">Description</label>
                    <div class="col-lg-11">
                        <textarea class="desc-content w-100" v-model="formCreate.description"> </textarea>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-lg-1 col-form-label form-control-label">Year</label>
                    <div class="col-lg-2">
                        <input class="form-control" type="number" v-model="formCreate.year">
                    </div>

                    <div class="space-empty w-100"></div>

                    <label class="col-lg-1 col-form-label form-control-label">Language</label>
                    <div class="col-lg-2">
                        <input class="form-control" type="text" v-model="formCreate.language">
                    </div>

                    <div class="col-lg-1"></div>

                    <label class="col-lg-1 col-form-label form-control-label">Genre</label>
                    <div class="col-lg-4">
                        <input class="form-control" type="text" placeholder="Ex: Romance, Drama, Sci-Fi"
                            v-model="textInputGenre">
                    </div>
                </div>

                <div class="form-group row episodes" v-for="index in  formCreate.eppisodes.length " :key="index">
                    <label class="col-lg-1 col-form-label form-control-label">Ep {{ index }}</label>
                    <div class="col-lg-5">
                        <input class="form-control" type="url" v-model="formCreate.eppisodes[index - 1].videoUrl">
                        <label class="col-form-label form-control-label text-secondary">Video url</label>
                    </div>
                    <div class="d-flex col-lg-4 btn-add-episodes" @click="handleAddEp" v-if="index == 1">
                        <i class="fas fa-plus-circle h3 mt-1"></i>
                        <span class="h5 mt-1 ml-2 text-primary">Add episodes</span>
                    </div>
                </div>

                <div class="form-group row cast" v-for="index in formCreate.casts.length" :key="index">
                    <label class="col-lg-1 col-form-label form-control-label">Cast</label>
                    <div class="col-lg-3">
                        <input class="form-control" type="text" v-model="formCreate.casts[index - 1].name">
                        <label class="col-form-label form-control-label text-secondary">Name</label>
                    </div>
                    <div class="col-lg-3">
                        <input class="form-control" type="text" v-model="formCreate.casts[index - 1].character">
                        <label class="col-form-label form-control-label text-secondary">Portray</label>
                    </div>
                    <div class="col-lg-4">
                        <input class="form-control" type="url" v-model="formCreate.casts[index - 1].avatar">
                        <label class="col-form-label form-control-label text-secondary">Image url</label>
                    </div>
                    <div class="d-flex col-lg-1 btn-add-episodes" @click="handleAddCast" v-if="index == 1">
                        <i class="fas fa-plus-circle h3 mt-1"></i>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-lg-1 col-form-label form-control-label">
                        Images
                    </label>
                    <div class="d-flex col-lg-4 btn-add-episodes" @click="handleAddCarousel">
                        <i class="fas fa-plus-circle h3 mt-1"></i>
                        <span class="h5 mt-1 ml-2 text-primary">Add carousel</span>
                    </div>

                    <div class="space-empty w-100"></div>

                    <label class="col-lg-1 col-form-label form-control-label">Background</label>
                    <div class="col-lg-5">
                        <input class="form-control" type="url" v-model="formCreate.posters[0]">
                    </div>

                    <label class="col-lg-1 col-form-label form-control-label">Poster</label>
                    <div class="col-lg-5">
                        <input class="form-control" type="url" v-model="formCreate.posters[1]">
                    </div>
                </div>

                <div class="form-group row carousel" v-for="img in (formCreate.posters.length - 2)">
                    <label class="col-lg-1 col-form-label form-control-label">Carousel {{ img }}</label>
                    <div class="col-lg-5">
                        <input class="form-control" type="url" v-model="formCreate.posters[img + 1]">
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"></label>
                    <div class="col-lg-9 d-flex justify-content-end">
                        <input type="reset" class="btn btn-secondary mr-2" value="Cancel">
                        <input type="submit" class="btn btn-primary" value="Submit">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { useMediaStore } from '@/stores/media.js';
import { useUserStore } from '@/stores/user.js';

import mediaService from '@/services/media.service.js';

export default {
    setup() {
        const mediaStore = useMediaStore();
        const userStore = useUserStore();
        return {
            mediaStore,
            userStore
        }
    },

    data() {
        return {
            textInputGenre: '',
            formCreate: {
                userID: this.userStore.admin._id,
                name: '',
                description: '',
                posters: [
                    'background',
                    'poster'
                ],
                category: '',
                genre: [],
                language: '',
                year: 1989,
                eppisodes: [
                    { videoUrl: '', number: 1 }
                ],
                rate: 0,
                numberOfReviews: 0,
                casts: [
                    {
                        name: '',
                        character: '',
                        avatar: ''
                    }
                ]
            }
        }
    },

    methods: {
        handleAddEp() {
            const number = this.formCreate.eppisodes.length + 1;
            this.formCreate.eppisodes.push({
                videoUrl: '',
                number: number
            });
            console.log(this.formCreate.eppisodes);
        },

        handleAddCarousel() {
            this.formCreate.posters.push("");
        },

        handleAddCast() {
            this.formCreate.casts.push({
                name: '',
                character: '',
                avatar: ''
            });
        },

        handleTextInputGenre() {
            const trim = this.textInputChange.replace(/\s+/g, '');
            this.textInputChange = trim.split(",");

            const result = [];

            for (let i = 0; i < this.textInputGenre.length; i++) {
                this.textInputGenre[i] = this.textInputGenre[i].charAt(0).toUpperCase() + this.textInputGenre[i].slice(1);
            }

            result.push(this.textInputGenre);
            this.formCreate.genre = result;
        },

        handleSubmitMedia() {
            this.handleTextInputGenre();
            const res = mediaService.create(this.formCreate, this.userStore.admin.token);
            console.log(this.formCreate);
            console.log(res);
        }
    },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/editMedia.scss';

.btn-add-episodes {
    cursor: pointer;
}
</style>
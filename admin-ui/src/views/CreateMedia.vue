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
                        <select name="category" class="form-control" v-model="formCreate.category">
                            <option>movie</option>
                            <option>tv series</option>
                        </select>
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
                </div>

                <div class="form-group row genre" v-for="index in  formCreate.genre.length ">
                    <label class="col-lg-1 col-form-label form-control-label">Genre</label>
                    <div class="col-lg-2">
                        <select name="genre" class="form-control" v-model="formCreate.genre[index - 1]">
                            <option v-for="opt in optionGenre">{{ opt }}</option>
                        </select>
                    </div>
                    <div class="d-flex col-lg-1 text-center" v-if="index == 1">
                        <font-awesome-icon :icon="['fas', 'plus-circle']" class="btn-add-item h3 mt-1"
                            @click="handleAddGenre" />
                        <font-awesome-icon :icon="['fas', 'minus-circle']" class="btn-del-item h3 mt-1 ml-3"
                            @click="handleDelGenre" />
                    </div>
                </div>

                <div class="form-group row episodes" v-for="index in  formCreate.eppisodes.length " :key="index">
                    <label class="col-lg-1 col-form-label form-control-label">Ep {{ index }}</label>
                    <div class="col-lg-5">
                        <input class="form-control" type="url" v-model="formCreate.eppisodes[index - 1].videoUrl">
                        <label class="col-form-label form-control-label text-secondary">Video url</label>
                    </div>
                    <div class="d-flex col-lg-1 text-center" v-if="index == 1">
                        <font-awesome-icon :icon="['fas', 'plus-circle']" class="btn-add-item h3 mt-1"
                            @click="handleAddEp" />
                        <font-awesome-icon :icon="['fas', 'minus-circle']" class="btn-del-item h3 mt-1 ml-3"
                            @click="handleDelEp" />
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
                    <div class="d-flex col-lg-1 text-center" v-if="index == 1">
                        <font-awesome-icon :icon="['fas', 'plus-circle']" class="btn-add-item h3 mt-1"
                            @click="handleAddCast" />
                        <font-awesome-icon :icon="['fas', 'minus-circle']" class="btn-del-item h3 mt-1 ml-3"
                            @click="handleDelCast" />
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-lg-1 col-form-label form-control-label">
                        Images
                    </label>
                    <div class="d-flex col-lg-1 text-center">
                        <font-awesome-icon :icon="['fas', 'plus-circle']" class="btn-add-item h3 mt-1"
                            @click="handleAddCarousel" />
                        <font-awesome-icon :icon="['fas', 'minus-circle']" class="btn-del-item h3 mt-1 ml-3"
                            @click="handleDelCarousel" />
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
            optionGenre: [
                'Action',
                'Adventure',
                'Music',
                'Crime',
                'Mystery',
                'Thriller',
                'Drama',
                'Family',
                'History',
                'Sci-Fi',
                'Comedy',
                'Romance',
                'Biography',
                'Fantasy'
            ],
            formCreate: {
                userID: this.userStore.admin._id,
                name: '',
                description: '',
                posters: [
                    '',
                    '',
                ],
                category: '',
                genre: [
                    ''
                ],
                language: '',
                year: 1999,
                eppisodes: [
                    {
                        videoUrl: '',
                        number: 1
                    }
                ],
                rate: 0,
                numberOfReviews: 0,
                casts: [
                    {
                        "name": "",
                        "character": "",
                        "avatar": ""
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
        },
        handleDelEp() {
            this.formCreate.eppisodes.pop();
        },

        handleAddGenre() {
            this.formCreate.genre.push("");
        },
        handleDelGenre() {
            this.formCreate.genre.pop();
        },

        handleAddCarousel() {
            this.formCreate.posters.push("");
        },
        handleDelCarousel() {
            this.formCreate.posters.pop();
        },

        handleAddCast() {
            this.formCreate.casts.push({
                name: '',
                character: '',
                avatar: ''
            });
        },
        handleDelCast() {
            this.formCreate.casts.pop();
        },

        async handleSubmitMedia() {
            const res = await mediaService.create(this.formCreate, this.userStore.admin.token);
            if (res.status == 201) {
                window.alert('Add movie successfully!');
                this.formCreate = {}
            }
            else {
                window.alert('Oops! Something wrong');
            }
        }
    },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/editMedia.scss';
</style>
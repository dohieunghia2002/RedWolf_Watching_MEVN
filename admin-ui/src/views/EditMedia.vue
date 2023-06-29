<template>
    <div class="edit-media" v-if="mediaStore.formMedia">
        <div class="container my-4">
            <div class="categories">
                <h4 class="col-md-12 title-menu text-uppercase">
                    Update info media
                    <span class="separate"></span>
                </h4>
            </div>

            <form method="POST" class="text-light">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a href="" data-target="#general" data-toggle="tab" class="nav-link active">General</a>
                    </li>
                    <li class="nav-item">
                        <a href="" data-target="#episodes" data-toggle="tab" class="nav-link">Episodes</a>
                    </li>
                    <li class="nav-item">
                        <a href="" data-target="#image" data-toggle="tab" class="nav-link">Images</a>
                    </li>
                    <li class="nav-item">
                        <a href="" data-target="#cast" data-toggle="tab" class="nav-link">Cast</a>
                    </li>
                </ul>

                <div class="tab-content py-4">
                    <div class="tab-pane active" id="general">
                        <div class="form-group row">
                            <label class="col-lg-1 col-form-label form-control-label">Creator</label>
                            <div class="col-lg-3">
                                <input class="form-control" type="text" v-model="mediaStore.formMedia.userID">
                            </div>

                            <label class="col-lg-1 col-form-label form-control-label">Name</label>
                            <div class="col-lg-4">
                                <input class="form-control" type="text" v-model="mediaStore.formMedia.name">
                            </div>

                            <label class="col-lg-1 col-form-label form-control-label">Category</label>
                            <div class="col-lg-2">
                                <input class="form-control" type="text" v-model="mediaStore.formMedia.category">
                            </div>

                            <div class="space-empty w-100"></div>

                            <label class="col-lg-1 col-form-label form-control-label">Description</label>
                            <div class="col-lg-11">
                                <textarea class="desc-content w-100" v-model="mediaStore.formMedia.description"> </textarea>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-1 col-form-label form-control-label">Year</label>
                            <div class="col-lg-2">
                                <input class="form-control" type="number" v-model="mediaStore.formMedia.year">
                            </div>

                            <div class="col-lg-1"></div>
                            <label class="col-lg-1 col-form-label form-control-label">Language</label>
                            <div class="col-lg-2">
                                <input class="form-control" type="text" v-model="mediaStore.formMedia.language">
                            </div>

                            <div class="space-empty w-100"></div>

                            <label class="col-lg-1 col-form-label form-control-label">Genre</label>
                            <div class="col-lg-2" v-for="(genre, index) in mediaStore.formMedia.genre" :key="index">
                                <select name="genre" class="form-control" v-model="mediaStore.formMedia.genre[index]">
                                    <option v-for="opt in mediaStore.optionGenre">{{ opt }}</option>
                                </select>
                            </div>

                            <BtnAddRemoveItem :msg="msgIdentifyAddDelItem[0]" />
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-1 col-form-label form-control-label">Score</label>
                            <div class="col-lg-2">
                                <input class="form-control" type="number" v-model="mediaStore.scoreInEditView" disabled>
                            </div>

                            <div class="col-lg-1"></div>

                            <label class="col-lg-1 col-form-label form-control-label">Reviewer</label>
                            <div class="col-lg-1">
                                <input class="form-control" type="number" v-model="mediaStore.formMedia.numberRater"
                                    disabled>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="episodes">
                        <div class="form-group row">
                            <label class="col-lg-1 col-form-label form-control-label">Episodes</label>
                            <div class="col-lg-1">
                                <input class="form-control" type="number" v-model="mediaStore.formMedia.eppisodes.length"
                                    min="0">
                            </div>
                        </div>

                        <div class="form-group row episodes">
                            <div class="w-100 d-flex flex-row my-2" v-for="(ep, index) in mediaStore.formMedia.eppisodes"
                                :key="index">
                                <div class="form-control-label col-lg-1">Ep {{ ep.number }}</div>
                                <div class="col-lg-10">
                                    <input class="form-control" type="url" v-model="ep.videoUrl">
                                    <label class="col-form-label form-control-label text-secondary">Video url</label>
                                </div>
                            </div>

                            <div class="space-empty w-100"></div>

                            <label class="col-lg-1 col-form-label form-control-label">Add ep</label>
                            <div class="col-lg-9">
                                <input class="form-control" type="url">
                                <label class="col-form-label form-control-label text-secondary">Video url</label>
                            </div>
                            <div class="col-lg-1">
                                <input class="form-control" type="number" min="1"
                                    :value="mediaStore.formMedia.eppisodes.length + 1">
                                <label class="col-form-label form-control-label text-secondary">No ep</label>
                            </div>
                            <div class="col-lg-1">
                                <button class="btn btn-primary" type="button">Add</button>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="image">
                        <div class="form-group row carousel">
                            <label class="col-lg-1 col-form-label form-control-label">Background</label>
                            <div class="col-lg-5">
                                <input class="form-control" type="url" v-model="mediaStore.formMedia.posters[0]">
                            </div>

                            <label class="col-lg-1 col-form-label form-control-label">Poster</label>
                            <div class="col-lg-5">
                                <input class="form-control" type="url" v-model="mediaStore.formMedia.posters[1]">
                            </div>

                            <div class="space-empty w-100"></div>

                            <div class="col-lg-1"></div>
                            <div class="col-lg-5">
                                <img class="media-image w-100" :src="mediaStore.formMedia.posters[0]" alt="Background">
                            </div>
                            <div class="col-lg-1"></div>
                            <div class="col-lg-5">
                                <img class="media-image w-50" :src="mediaStore.formMedia.posters[1]" alt="Poster">
                            </div>
                            <div class="space-empty w-100"></div>

                            <div class="d-flex flex-wrap"
                                v-for="(carousel, index) in mediaStore.formMedia.posters.slice(2)">
                                <label class="col-lg-1 col-form-label form-control-label">Carousel {{ index + 1 }}</label>
                                <div class="col-lg-5">
                                    <input class="form-control" type="url"
                                        v-model="mediaStore.formMedia.posters[index + 2]">
                                </div>

                                <div class="col-lg-1"></div>
                                <div class="col-lg-5">
                                    <img class="media-image w-100" :src="mediaStore.formMedia.posters[index + 2]"
                                        alt="carousel">
                                </div>
                                <div class="space-empty w-100"></div>
                            </div>

                            <label class="col-lg-1 col-form-label form-control-label">Add image</label>
                            <div class="col-lg-5">
                                <input class="form-control" type="url">
                                <label class="col-form-label form-control-label text-secondary">Image url</label>
                            </div>
                            <div class="col-lg-1">
                                <button class="btn btn-primary" type="button">Add</button>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="cast">
                        <div class="form-group row cast">
                            <div class="w-100 d-flex flex-wrap my-4" v-for="(cast, index) in mediaStore.formMedia.casts"
                                :key="index">
                                <label class="col-lg-1 col-form-label form-control-label"></label>
                                <div class="col-lg-3">
                                    <input class="form-control" type="text" v-model="cast.name">
                                    <label class="col-form-label form-control-label">Name</label>
                                </div>

                                <div class="col-lg-3">
                                    <input class="form-control" type="text" v-model="cast.character">
                                    <label class="col-form-label form-control-label">Character</label>
                                </div>

                                <div class="col-lg-5">
                                    <input class="form-control" type="url" v-model="cast.avatar">
                                    <label class="col-form-label form-control-label">Image url</label>
                                </div>

                                <div class="space-empty w-100"></div>
                            </div>
                            <label class="col-lg-1 col-form-label form-control-label">Add cast</label>
                            <div class="col-lg-3">
                                <input class="form-control" type="text">
                                <label class="col-form-label form-control-label text-secondary">Name</label>
                            </div>
                            <div class="col-lg-3">
                                <input class="form-control" type="text">
                                <label class="col-form-label form-control-label text-secondary">Character</label>
                            </div>
                            <div class="col-lg-4">
                                <input class="form-control" type="url">
                                <label class="col-form-label form-control-label text-secondary">Image url</label>
                            </div>
                            <div class="col-lg-1">
                                <button class="btn btn-primary" type="button">Add</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"></label>
                    <div class="col-lg-9 d-flex justify-content-end">
                        <input type="submit" class="btn btn-primary" value="Save Changes">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import BtnAddRemoveItem from '@/components/BtnAddRemoveItem.vue';

import { useMediaStore } from '@/stores/media.js';
import mediaService from '@/services/media.service.js';

export default {
    setup() {
        const mediaStore = useMediaStore();
        return {
            mediaStore
        }
    },

    components: { BtnAddRemoveItem },

    data() {
        return {
            msgIdentifyAddDelItem: ['genre', 'ep', 'cast', 'img'],
        }
    },

    methods: {
        handleBtnTriggerEpisodesClick() {
            const episodesEle = document.getElementsByClassName('form-group episodes')[0];
            const btnEle = document.getElementsByClassName('btn-link btn-show-hide-episodes')[0];
            const iEle = document.createElement("i");
            if (episodesEle.style.display == "none") {
                episodesEle.style.display = "flex";
                btnEle.innerHTML = "Hide list episodes";
                iEle.classList.add("fas", "fa-arrow-up", "ml-1");
            }
            else {
                episodesEle.style.display = "none";
                btnEle.innerHTML = "Show list episodes";
                iEle.classList.add("fas", "fa-arrow-down", "ml-1");
            }
            btnEle.appendChild(iEle);
        },

        handleBtnTriggerCastClick() {
            const castEle = document.getElementsByClassName('form-group cast')[0];
            const btnEle = document.getElementsByClassName('btn-link btn-show-hide-cast')[0];
            const iEle = document.createElement("i");
            if (castEle.style.display == "none") {
                castEle.style.display = "flex";
                btnEle.innerHTML = "Hide list cast";
                iEle.classList.add("fas", "fa-arrow-up", "ml-1");
            }
            else {
                castEle.style.display = "none";
                btnEle.innerHTML = "Show list cast";
                iEle.classList.add("fas", "fa-arrow-down", "ml-1");
            }
            btnEle.appendChild(iEle);
        },

        handleBtnTriggerCarouselClick() {
            const carouselEle = document.getElementsByClassName('form-group carousel')[0];
            const btnEle = document.getElementsByClassName('btn-link btn-show-hide-carousel')[0];
            const iEle = document.createElement("i");
            if (carouselEle.style.display == "none") {
                carouselEle.style.display = "flex";
                btnEle.innerHTML = "Hide list carousel";
                iEle.classList.add("fas", "fa-arrow-up", "ml-1");
            }
            else {
                carouselEle.style.display = "none";
                btnEle.innerHTML = "Show list carousel";
                iEle.classList.add("fas", "fa-arrow-down", "ml-1");
            }
            btnEle.appendChild(iEle);
        }
    },

    async created() {
        this.mediaStore.formMedia = await mediaService.getDetail(this.$route.params.id);
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/editMedia.scss';
</style>
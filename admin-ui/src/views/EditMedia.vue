<template>
    <div class="edit-media" v-if="mediaStore.media">
        <div class="container my-4">
            <div class="categories">
                <h4 class="col-md-12 title-menu text-uppercase">
                    Update info media
                    <span class="separate"></span>
                </h4>
            </div>

            <form method="POST" class="text-light">
                <!-- Info general for movie -->
                <div class="form-group row">
                    <label class="col-sm-1 col-form-label form-control-label">Creator</label>
                    <div class="col-sm-3">
                        <input class="form-control" type="text" v-model="mediaStore.media.userID">
                    </div>

                    <label class="col-sm-1 col-form-label form-control-label">Name</label>
                    <div class="col-sm-4">
                        <input class="form-control" type="text" v-model="mediaStore.media.name">
                    </div>

                    <label class="col-sm-1 col-form-label form-control-label">Category</label>
                    <div class="col-sm-2">
                        <input class="form-control" type="text" v-model="mediaStore.media.category">
                    </div>

                    <div class="space-empty w-100"></div>

                    <label class="col-sm-1 col-form-label form-control-label">Description</label>
                    <div class="col-sm-11">
                        <textarea class="desc-content w-100" v-model="mediaStore.media.description"> </textarea>
                    </div>
                </div>

                <!-- Info general for movie -->
                <div class="form-group row">
                    <label class="col-sm-1 col-form-label form-control-label">Year</label>
                    <div class="col-sm-2">
                        <input class="form-control" type="text" v-model="mediaStore.media.year">
                    </div>

                    <div class="space-empty w-100"></div>

                    <label class="col-sm-1 col-form-label form-control-label">Language</label>
                    <div class="col-sm-2">
                        <input class="form-control" type="text" v-model="mediaStore.media.language">
                    </div>

                    <div class="col-sm-1"></div>

                    <label class="col-sm-1 col-form-label form-control-label">Genre</label>
                    <div class="col-sm-2" v-for="(genre, index) in mediaStore.media.genre" :key="index">
                        <input class="form-control" type="text" v-model="mediaStore.media.genre[index]">
                    </div>

                    <div class="space-empty w-100"></div>

                    <div class="col-sm-3"></div>
                    <label class="col-sm-2 col-form-label form-control-label">Add genre</label>
                    <div class="col-sm-2">
                        <input class="form-control" type="text">
                    </div>
                    <div class="col-sm-1">
                        <button class="btn btn-primary" type="button">Add</button>
                    </div>
                </div>

                <!-- Info rate and total rater -->
                <div class="form-group row">
                    <label class="col-sm-1 col-form-label form-control-label">Score</label>
                    <div class="col-sm-2">
                        <input class="form-control" type="number" v-model="mediaStore.score">
                    </div>

                    <div class="col-sm-1"></div>

                    <label class="col-sm-1 col-form-label form-control-label">Reviewer</label>
                    <div class="col-sm-1">
                        <input class="form-control" type="number" v-model="mediaStore.media.numberRater">
                    </div>
                </div>

                <!-- Quantity episodes -->
                <div class="form-group row">
                    <label class="col-sm-1 col-form-label form-control-label">Episodes</label>
                    <div class="col-sm-1">
                        <input class="form-control" type="number" v-model="mediaStore.media.eppisodes.length" min="0">
                    </div>
                    <div class="col-sm-3">
                        <button class="btn-show-hide btn btn-link" type="button">
                            Show list episodes
                            <font-awesome-icon :icon="['fas', 'caret-down']" />
                        </button>
                    </div>
                </div>

                <!-- Info each of ep -->
                <div class="form-group row" v-for="(ep, index) in mediaStore.media.eppisodes" :key="index">
                    <div class="form-control-label col-sm-1">Ep {{ ep.number }}</div>
                    <div class="col-sm-9">
                        <input class="form-control" type="url" v-model="ep.videoUrl">
                        <label class="col-form-label form-control-label text-secondary">Video url</label>
                    </div>

                    <div class="space-empty w-100"></div>

                    <label class="col-sm-1 col-form-label form-control-label">Add ep</label>
                    <div class="col-sm-9">
                        <input class="form-control" type="url">
                        <label class="col-form-label form-control-label text-secondary">video url</label>
                    </div>
                    <div class="col-sm-1">
                        <input class="form-control" type="number" min="1" :value="mediaStore.media.eppisodes.length + 1">
                        <label class="col-form-label form-control-label text-secondary">No ep</label>
                    </div>
                    <div class="col-sm-1">
                        <button class="btn btn-primary" type="button">Add</button>
                    </div>
                </div>

                <div class="form-group row">
                    <button class="btn-show-hide btn btn-link col-sm-12 form-control-label">
                        Show list cast
                        <font-awesome-icon :icon="['fas', 'caret-down']" />
                    </button>
                </div>

                <!-- Info for each of cast -->
                <div class="form-group row" v-for="(cast, index) in mediaStore.media.casts" :key="index">
                    <label class="col-sm-1 col-form-label form-control-label">Name</label>
                    <div class="col-sm-3">
                        <input class="form-control" type="text" v-model="cast.name">
                    </div>

                    <label class="col-sm-1 col-form-label form-control-label">Character</label>
                    <div class="col-sm-3">
                        <input class="form-control" type="text" v-model="cast.character">
                    </div>

                    <div class="space-empty w-100"></div>

                    <label class="col-sm-1 col-form-label form-control-label">Image url</label>
                    <div class="col-sm-9">
                        <input class="form-control" type="url" v-model="cast.avatar">
                    </div>
                </div>

                <!-- Add cast -->
                <div class="form-group row">
                    <label class="col-sm-1 col-form-label form-control-label">Add cast</label>
                    <div class="col-sm-3">
                        <input class="form-control" type="text">
                        <label class="col-form-label form-control-label text-secondary">Name</label>
                    </div>
                    <div class="col-sm-3">
                        <input class="form-control" type="text">
                        <label class="col-form-label form-control-label text-secondary">Character</label>
                    </div>
                    <div class="col-sm-5">
                        <input class="form-control" type="url">
                        <label class="col-form-label form-control-label text-secondary">Image url</label>
                    </div>
                </div>

                <div class="form-group row">
                    <button class="btn-show-hide btn btn-link col-sm-12 form-control-label">
                        Show images intro
                        <font-awesome-icon :icon="['fas', 'caret-down']" />
                    </button>
                </div>

                <div class="form-group row">
                    <label class="col-sm-1 col-form-label form-control-label">Background</label>
                    <div class="col-sm-5">
                        <input class="form-control" type="url" v-model="mediaStore.media.posters[0]">
                    </div>

                    <label class="col-sm-1 col-form-label form-control-label">Poster</label>
                    <div class="col-sm-5">
                        <input class="form-control" type="url" v-model="mediaStore.media.posters[1]">
                    </div>

                    <div class="space-empty w-100"></div>

                    <div class="col-sm-1"></div>
                    <div class="col-sm-5">
                        <img class="media-image w-100" :src="mediaStore.media.posters[0]" alt="Background">
                    </div>
                    <div class="col-sm-1"></div>
                    <div class="col-sm-5">
                        <img class="media-image w-50" :src="mediaStore.media.posters[1]" alt="Poster">
                    </div>

                    <div class="space-empty w-100"></div>
                    <label class="col-sm-1 col-form-label form-control-label">Carousel</label>
                    <div class="col-sm-1">
                        <input class="form-control" type="number" v-model="mediaStore.numberCarousel">
                    </div>
                </div>

                <div class="form-group row" v-for="(carousel, index) in mediaStore.listCarousel">
                    <label class="col-sm-1 col-form-label form-control-label">Carousel {{ index + 1 }}</label>
                    <div class="col-sm-5">
                        <input class="form-control" type="url" v-model="mediaStore.listCarousel[index]">
                    </div>

                    <div class="col-sm-1"></div>
                    <div class="col-sm-5">
                        <img class="media-image w-100" :src="mediaStore.listCarousel[index]" alt="carousel">
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-sm-1 col-form-label form-control-label">Add image</label>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { useMediaStore } from '@/stores/media.js';
import mediaService from '@/services/media.service.js';

export default {
    setup() {
        const mediaStore = useMediaStore();
        return {
            mediaStore
        }
    },

    async created() {
        this.mediaStore.media = await mediaService.getDetail(this.$route.params.id);
        console.log(this.mediaStore.media.posters.slice(2));
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/globalStyle.scss';

.form-group {
    margin: 28px 0;

    .form-control-label {
        text-align: right;
        padding: 7px;
    }

    .space-empty {
        height: 28px;
    }
}

.btn-show-hide {
    text-decoration: none;
    color: $primary-color;
}

.desc-content {
    border-radius: 0.25rem;
}
</style>
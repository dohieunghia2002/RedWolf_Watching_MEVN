<template>
    <div class="create-media">
        <div class="container my-4">
            <div class="categories">
                <h4 class="col-md-12 title-menu text-uppercase">
                    Create media
                    <span class="separate"></span>
                </h4>
            </div>

            <form method="POST" class="text-light">
                <!-- Info general for movie -->
                <div class="form-group row">
                    <label class="col-lg-1 col-form-label form-control-label">Creator</label>
                    <div class="col-lg-3">
                        <input class="form-control" type="text" v-model="mediaStore.media.userID">
                    </div>

                    <label class="col-lg-1 col-form-label form-control-label">Name</label>
                    <div class="col-lg-4">
                        <input class="form-control" type="text" v-model="mediaStore.media.name">
                    </div>

                    <label class="col-lg-1 col-form-label form-control-label">Category</label>
                    <div class="col-lg-2">
                        <input class="form-control" type="text" placeholder="movie/tv series"
                            v-model="mediaStore.media.category">
                    </div>

                    <div class="space-empty w-100"></div>

                    <label class="col-lg-1 col-form-label form-control-label">Description</label>
                    <div class="col-lg-11">
                        <textarea class="desc-content w-100" v-model="mediaStore.media.description"> </textarea>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { useMediaStore } from '@/stores/media.js';
import { useUserStore } from '@/stores/user.js';

export default {
    setup() {
        const mediaStore = useMediaStore();
        const userStore = useUserStore();
        return {
            mediaStore,
            userStore
        }
    },

    async created() {
        this.mediaStore.media = {};
        this.mediaStore.media.userID = this.userStore.admin._id;
    },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/editMedia.scss';
</style>
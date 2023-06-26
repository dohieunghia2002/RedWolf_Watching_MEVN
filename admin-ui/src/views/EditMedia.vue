<template>
    <div class="edit-media" v-if="mediaStore.media">
        <div class="container my-4">
            <div class="categories">
                <h4 class="col-md-12 title-menu text-uppercase">
                    Update info media
                    <span class="separate"></span>
                </h4>
            </div>

            <form method="POST">
                <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">Name</label>
                    <div class="col-lg-9">
                        <input class="form-control" type="text" v-model="mediaStore.media.name">
                    </div>
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
        console.log(this.mediaStore.media);
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/globalStyle.scss';

.title-page {
    color: $primary-color;
}
</style>
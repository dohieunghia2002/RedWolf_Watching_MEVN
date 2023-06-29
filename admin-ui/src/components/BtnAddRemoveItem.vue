<template>
    <div class="d-flex col-lg-1 text-center">
        <font-awesome-icon :icon="['fas', 'plus-circle']" class="btn-add-item h3 mt-1" @click="handleAdd" />
        <font-awesome-icon :icon="['fas', 'minus-circle']" class="btn-del-item h3 mt-1 ml-3" @click="handleDel" />
    </div>
</template>
<script>
import { useMediaStore } from '@/stores/media.js';

export default {
    props: ['msg'],
    setup() {
        const mediaStore = useMediaStore();
        return {
            mediaStore
        }
    },

    methods: {
        handleAdd() {
            if (this.msg === 'genre') {
                this.mediaStore.formCreate.genre.push("");
            }
            else if (this.msg === 'ep') {
                const number = this.mediaStore.formCreate.eppisodes.length + 1;
                this.mediaStore.formCreate.eppisodes.push({
                    videoUrl: '',
                    number: number
                });
            }
            else if (this.msg === 'cast') {
                this.mediaStore.formCreate.casts.push({
                    name: '',
                    character: '',
                    avatar: ''
                });
            }
            else {
                this.mediaStore.formCreate.posters.push("");
            }
        },

        handleDel() {
            if (this.msg === 'genre') {
                this.mediaStore.formCreate.genre.pop();
            }
            else if (this.msg === 'ep') {
                this.mediaStore.formCreate.eppisodes.pop();
            }
            else if (this.msg === 'cast') {
                this.mediaStore.formCreate.casts.pop();
            }
            else {
                this.mediaStore.formCreate.posters.pop();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/globalStyle.scss';

.btn-add-item,
.btn-del-item {
    cursor: pointer;
}

.btn-add-item {
    color: $blue-color;
}

.btn-del-item {
    color: $primary-color;
}
</style>
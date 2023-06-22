<template>
    <div class="favorites" v-if="favoritesStore.favorites">
        <div class="container mt-4">
            <div class="categories">
                <h4 class="col-md-12 title-menu text-uppercase">
                    YOUR favorites
                    <span class="separate"></span>
                </h4>
            </div>
            <span class="famille"></span>

            <div class="list-empty text-center text-light" v-if="favoritesStore.favorites.mediaID.length === 0">
                <h2>You haven't favorited any media yet</h2>
            </div>

            <div class="sections row list">
                <template v-for="(media, index) in favoritesStore.listMedia" :key="index">
                    <div class="list-favorites-item">
                        <router-link :to="{ name: 'detail', params: { id: media._id } }">
                            <div class="card mt-2">
                                <img class="card-img-top" :src="favoritesStore.pathImageMedia + media.posters[1]"
                                    alt="Poster" />

                                <div class="card-body">
                                    <div class="empty-space"></div>
                                    <div>
                                        <h4 class="card-title">{{ media.name }}</h4>
                                        <p class="card-text">{{ media.year }}</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>

                        <div class="remove" @click="removeMedia(media)">
                            <font-awesome-icon :icon="['fas', 'trash']" class="icon-remove" />
                            <span class="ml-2">Remove</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { useFavoritesStore } from '@/stores/favorites.js';
import { useUserStore } from '@/stores/user.js';

import favoritesService from '@/services/favorites.service.js';

export default {
    setup() {
        const favoritesStore = useFavoritesStore();
        const userStore = useUserStore();
        return {
            favoritesStore,
            userStore
        }
    },

    methods: {
        async handleSetData() {
            const token = await this.userStore.account.token;
            this.favoritesStore.favorites = await favoritesService.getList(token);

            if (this.favoritesStore.favorites) {
                await this.favoritesStore.detailMedia(token);
            }
        },

        async removeMedia(media) {
            const id = this.favoritesStore.getMediaIDRemove(media);
            this.favoritesStore.favorites = await favoritesService.remove(id, this.userStore.account.token);
            await this.handleSetData();
        },
    },

    async created() {
        await this.handleSetData();
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/favorites.scss';
</style>
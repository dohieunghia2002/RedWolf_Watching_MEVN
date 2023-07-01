<template>
    <div class="membership container-fluid mt-4" v-if="userStore.members.length > 0">
        <table class="table table-bordered bg-light">
            <thead>
                <tr class="text-center">
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Favorites</th>
                    <th scope="col">Reviews</th>
                    <th scope="col" colspan="3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in userStore.members" :key="index" class="text-center items-movie">
                    <th scope="row">{{ index + 1 }}</th>
                    <td class="text-left">{{ user.fullName }}</td>
                    <td>{{ user.username }}</td>
                    <td class="text-info">
                        {{ userStore.members[index].mediaID?.length || 0 }}
                    </td>
                    <td></td>
                    <td colspan="2">
                        <!-- <router-link :to="{ name: 'edit', params: { id: user._id } }" class="btn btn-link"
                            type="button">
                            Edit
                        </router-link> -->
                        <a href="" class="btn btn-link">
                            Edit
                        </a>
                        <button class="btn btn-link text-danger" type="button">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { useUserStore } from '@/stores/user.js';
import { useFavoriteStore } from '@/stores/favorite.js';

import userService from '@/services/user.service.js';
import favoriteService from '@/services/favorite.service.js';

export default {
    setup() {
        const userStore = useUserStore();
        const favoriteStore = useFavoriteStore();
        return {
            userStore,
            favoriteStore
        }
    },

    methods: {
        async mergeByUserId() {
            return this.userStore.members.map(itm => ({
                ...this.favoriteStore.favorites.find((item) => (item.userID === itm._id) && item),
                ...itm
            }));
        }
    },

    async created() {
        this.userStore.members = await userService.list(this.userStore.admin.token);
        this.favoriteStore.favorites = await favoriteService.favorites(this.userStore.admin.token);
        this.userStore.members = await this.mergeByUserId();
    }
}
</script>
<style lang="scss" scoped></style>
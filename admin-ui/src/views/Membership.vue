<template>
    <div class="membership">
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
                    <td class="text-left">{{ user.name }}</td>
                    <td>{{ user.year }}</td>
                    <td class="text-info">{{ (user.rate / user.numberRater) || 0 }}</td>
                    <td>{{ user.language }}</td>
                    <td colspan="2">
                        <router-link :to="{ name: 'edit', params: { id: user._id } }" class="btn btn-link"
                            type="button">Edit</router-link>
                        <button class="btn btn-link text-danger" type="button">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { useUserStore } from '@/stores/user.js';

import userService from '@/services/user.service.js';

export default {
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },

    async created() {
        this.userStore.members = await userService.list();
    },
}
</script>
<style lang="scss" scoped></style>
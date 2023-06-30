<template>
    <div class="trash mt-4 container-fluid">
        <table class="table table-bordered bg-light">
            <thead>
                <tr class="text-center">
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Year</th>
                    <th scope="col">Rate (/100)</th>
                    <th scope="col">Languages</th>
                    <th scope="col" colspan="2"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(movie, index) in mediaStore.trash" :key="index" class="text-center items-movie">
                    <th scope="row">{{ index + 1 }}</th>
                    <td class="text-left">{{ movie.name }}</td>
                    <td>{{ movie.year }}</td>
                    <td class="text-info">{{ (movie.rate / movie.numberRater) || 0 }}</td>
                    <td>{{ movie.language }}</td>
                    <td colspan="2">
                        <button type="button" class="btn btn-link text-primary">Restore</button>
                        <button type="button" class="btn btn-link text-danger">Remove</button>
                    </td>
                </tr>
            </tbody>
        </table>
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
        this.mediaStore.getTrash(this.userStore.admin.token);
    },
}
</script>
<style lang="scss" scoped>
.trash {
    min-height: 510px;
}
</style>
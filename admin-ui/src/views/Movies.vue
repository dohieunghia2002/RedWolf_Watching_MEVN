<template>
    <div class="movies mt-4 container-fluid">
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
                <tr v-for="(movie, index) in mediaStore.listMovies" :key="index" class="text-center items-movie">
                    <th scope="row">{{ index + 1 }}</th>
                    <td class="text-left">{{ movie.name }}</td>
                    <td>{{ movie.year }}</td>
                    <td class="text-info">{{ (movie.rate / movie.numberRater) || 0 }}</td>
                    <td>{{ movie.language }}</td>
                    <td colspan="2">
                        <button class="btn btn-link" type="button">Edit</button>
                        <button class="btn btn-link text-danger" type="button">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { useMediaStore } from '@/stores/media.js';

export default {
    setup() {
        const mediaStore = useMediaStore();
        return {
            mediaStore
        }
    },

    async created() {
        await this.mediaStore.getList();
    },
}
</script>
<style lang="scss" scoped>
.items-movie {
    font-size: 1.2rem;

    th,
    td {
        vertical-align: middle;
    }
}
</style>
<template>
    <nav aria-label="Page navigation example" class="navigation">
        <ul class="pagination">
            <li class="page-item">
                <button type="button" @click="" class="page-link">
                    Previous
                </button>
            </li>
            <li v-for="(page, index) in paginationStore.pagesNumber(this.totalQuantityMovies)" class="page-item">
                <button type="button" @click="paginationStore.indexCurrentPage(index)" class="page-link">
                    {{ page }}
                </button>
            </li>
            <li class="page-item">
                <button type="button" @click="" class="page-link">
                    Next
                </button>
            </li>
        </ul>
    </nav>
</template>
<script>
import { useMediaStore } from '@/stores/media.js';
import { usePaginationStore } from '@/stores/pagination.js';


export default {
    props: ['totalQuantityMovies'],

    setup() {
        const mediaStore = useMediaStore();
        const paginationStore = usePaginationStore();
        return {
            mediaStore,
            paginationStore
        }
    }
}
</script>
<style lang="scss" scoped>
.pagination,
.page-item {
    display: flex;
    justify-content: center;
    align-items: center;
}

.page-item {
    font-size: 1.6rem;
    background-color: #fff;
    padding: 8px;
}

.page-link {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: transparent;
    text-align: center;
    font-size: 1.2rem;
}
</style>
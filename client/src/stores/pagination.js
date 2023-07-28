const QUANTITY_FILM_PAGE = 10;
import { defineStore } from 'pinia';

export const usePaginationStore = defineStore('pagination', {
    state: () => {
        return {
            idxCurPage: 0
        }
    },

    actions: {
        pagesNumber(totalQuantityMovies) {
            return Math.ceil(totalQuantityMovies / QUANTITY_FILM_PAGE);
        },

        indexFirstFilmOfPage(idxPage) {
            return idxPage * QUANTITY_FILM_PAGE;
        },

        indexLastFilmOfPage(idxPage) {
            return idxPage * QUANTITY_FILM_PAGE + (QUANTITY_FILM_PAGE - 1);
        },

        indexCurrentPage(idxPage) {
            this.idxCurPage = idxPage;
        }
    },
});

<template>
    <Header :key="generateKey($route.path, screenWidth)" />
    <router-view />
    <SigninForm />
    <SignupForm />
    <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import SignupForm from '@/components/SignupForm.vue';
import SigninForm from '@/components/SigninForm.vue';

import { useMediaStore } from './stores/media.js';
import mediaService from './services/media.service.js';

export default {
    components: {
        Header,
        Footer,
        SignupForm,
        SigninForm
    },

    setup() {
        const mediaStore = useMediaStore();
        return {
            mediaStore
        }
    },

    computed: {
        screenWidth() {
            return screen.width;
        }
    },

    methods: {
        generateKey(item, index) {
            const uniqueKey = `${item}-${index}`;
            return uniqueKey;
        },
    },

    async created() {
        this.mediaStore.popularMovies = await mediaService.popularMovies();
        this.mediaStore.ratedMovies = await mediaService.ratedMovies();
        this.mediaStore.popularTVSeries = await mediaService.popularTVSeries();
        this.mediaStore.ratedSeries = await mediaService.ratedTVSeries();
    }
}

</script>

<style lang="scss" scoped></style>
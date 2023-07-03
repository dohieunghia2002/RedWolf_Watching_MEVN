<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <img src="@/assets/images/logo-red-wolf.png" class="logo" alt="logo">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent" :key="active_curUrl">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item navigate">
                        <router-link class="nav-link" :to="{ name: 'home' }">
                            HOME
                            <span class="sr-only">(current)</span>
                        </router-link>
                    </li>

                    <li class="nav-item navigate">
                        <router-link class="nav-link" :to="{ name: 'movies' }">MOVIES</router-link>
                    </li>

                    <li class="nav-item navigate">
                        <router-link class="nav-link" :to="{ name: 'series' }">TV SERIES</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'search' }">SEARCH</router-link>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <div class="btn-auth" v-if="userStore.isLoggedin == false">
                        <li class="nav-item active">
                            <button class="btn btn-link button text-uppercase" type="button" data-toggle="modal"
                                data-target="#modal-signin-form">
                                Sign in
                            </button>
                        </li>

                        <li class="nav-item">
                            <button class="btn btn-link button text-uppercase" type="button" data-toggle="modal"
                                data-target="#modal-signup-form">
                                Sign up
                            </button>
                        </li>
                    </div>

                    <li class="nav-item dropdown" v-else>
                        <Avatar :name="userStore.account.fullName" />
                        <a class="nav-link dropdown-toggle mb-1 w-100 h-100" href="#" id="navbarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" :aria-expanded="ariaExpended"
                            v-on:click="this.handleShowMenudropdown()">
                            {{ userStore.account.fullName }}
                        </a>

                        <div class="dropdown-menu dropdown-menu-right mt-2" aria-labelledby="navbarDropdown">
                            <router-link class="dropdown-item" :to="{ name: 'favorites' }">
                                <font-awesome-icon :icon="['fas', 'heart']" />
                                <div class="content">
                                    FAVORITES
                                </div>
                            </router-link>
                            <router-link class="dropdown-item" :to="{ name: 'review' }">
                                <font-awesome-icon :icon="['fas', 'feather']" />
                                <div class="content">
                                    REVIEWS
                                </div>
                            </router-link>
                            <router-link class="dropdown-item" :to="{ name: 'profile' }">
                                <font-awesome-icon :icon="['fas', 'rotate-right']" />
                                <div class="content">
                                    UPDATE PROFILE
                                </div>
                            </router-link>
                            <button class="dropdown-item" to="/" type="button" @click="handleLogout">
                                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                                <div class="content">
                                    LOGOUT
                                </div>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import Avatar from './Avatar.vue';

import { useUserStore } from '@/stores/user.js';

export default {
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },

    components: { Avatar },

    data() {
        return {
            active_curUrl: '',
            ariaExpended: false,
        }
    },

    methods: {
        handleShowMenudropdown() {
            const dropdownEle = document.getElementsByClassName('dropdown')[0];
            const dropdownMenuEle = document.getElementsByClassName('dropdown-menu')[0];

            if (dropdownEle.classList.contains('show')) {
                dropdownEle.classList.remove('show');
                this.ariaExpended = false;
                dropdownMenuEle.classList.remove('show');
            }
            else {
                dropdownEle.classList.add('show');
                this.ariaExpended = true;
                dropdownMenuEle.classList.add('show');
            }
        },

        handleActiveNav() {
            const navigateEle = document.getElementsByClassName("navigate");
            for (let i = 0; i < navigateEle.length; i++) {
                const curUrl = navigateEle[i].getElementsByClassName("nav-link")[0].href;
                var path = document.createElement('a');
                path.href = curUrl;

                if (path.pathname === this.active_curUrl) {
                    navigateEle[i].classList.add('active');
                }
                else navigateEle[i].classList.remove('active');
            }
        },

        async handleLogout() {
            await this.$router.push('/');
            this.userStore.logout();
        }
    },

    async created() {
        this.active_curUrl = window.location.pathname;
    },

    async mounted() {
        this.handleActiveNav();
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/header.scss';
</style>

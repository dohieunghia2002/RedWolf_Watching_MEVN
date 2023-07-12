<template>
    <div class="header">
        <!-- <nav class="navbar navbar-expand-lg navbar-dark">
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

                    <li class="nav-item navigate">
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
                        <Avatar :fullName="userStore.account.fullName"
                            style="width: 70px; height: 100%; padding: 3px 2px;" />
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
                            <router-link class="dropdown-item" :to="{ name: 'password' }">
                                <font-awesome-icon :icon="['fas', 'rotate-right']" />
                                <div class="content">
                                    CHANGE PASSWORD
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
        </nav> -->

        <div class="logo">
            <img class="w-100" src="../assets/images/logo-red-wolf.png" alt="Logo Image">
        </div>

        <nav class="nav-pc">
            <ul class="nav-list text-uppercase">
                <li class="navigate">
                    <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
                </li>
                <li class="navigate">
                    <router-link :to="{ name: 'movies' }" class="nav-link">Movies</router-link>
                </li>
                <li class="navigate">
                    <router-link :to="{ name: 'series' }" class="nav-link">Series</router-link>
                </li>
                <li class="navigate">
                    <router-link :to="{ name: 'search' }" class="nav-link">Search</router-link>
                </li>
            </ul>

            <ul class="nav-list nav-list-right">
                <li class="nav-auth active">
                    <button class="btn-auth text-uppercase" type="button" data-toggle="modal"
                        data-target="#modal-signin-form">
                        Sign in
                    </button>
                </li>
                <li class="nav-auth">
                    <button class="btn-auth text-uppercase" type="button" data-toggle="modal"
                        data-target="#modal-signup-form">
                        Sign up
                    </button>
                </li>
            </ul>
        </nav>

        <!-- <nav class="nav-bars-btn" style="display: none;">
            <font-awesome-icon class="text-light" :icon="['fas', 'list-ul']" />
        </nav> -->
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
            window.location.href = "http://localhost:8000/"
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
// @import '../assets/styles/header.scss';

.header {
    display: flex;
    align-items: center;
    height: 64px;
    background-color: $black-color;

    .logo {
        width: $width-logo;
        margin-left: 24px;
        margin-right: 24px;
    }
}

.nav-pc {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    .navigate,
    .nav-auth {
        font-size: 1.2rem;
        font-weight: 600;
        border-radius: 5px;
        overflow: hidden;

        &.active {
            background-color: $primary-color;
        }
    }

    .navigate:not(.active):hover {
        background-color: rgba(255, 0, 0, 0.08);
    }

    .nav-link {
        text-decoration: none;
        margin-right: 0 4px;
        color: $white-color;
    }
}

.btn-auth {
    text-align: center;
    color: $white-color;
    margin: 0;
}
</style>

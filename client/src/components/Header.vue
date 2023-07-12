<template>
    <div class="header">
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

            <ul class="nav-list nav-list-right" v-if="!userStore.isLoggedin">
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

            <div class="dropdown" v-else>
                <Avatar :fullName="userStore.account.fullName" style="width: 46px; height: 100%; padding: 3px 2px;" />
                <button class="dropbtn text-white" style="padding-left: 12px;" @click="handleShowMenudropdown()">
                    {{ userStore.account.fullName }}
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content" id="myDropdown">
                    <router-link class="dropdown-content-text" :to="{ name: 'favorites' }">
                        <font-awesome-icon :icon="['fas', 'heart']" class="mr-1" />
                        FAVORITES
                    </router-link>
                    <router-link class="dropdown-content-text" :to="{ name: 'review' }">
                        <font-awesome-icon :icon="['fas', 'feather']" class="mr-1" />
                        REVIEWS
                    </router-link>
                    <router-link class="dropdown-content-text" :to="{ name: 'password' }">
                        <font-awesome-icon :icon="['fas', 'rotate-right']" class="mr-1" />
                        CHANGE PASSWORD
                    </router-link>
                    <button class="dropdown-content-text m-0" type="button" @click="handleLogout">
                        <div class="w-100">
                            <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="mr-1" />
                            LOGOUT
                        </div>
                    </button>
                </div>
            </div>
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
            document.getElementById("myDropdown").classList.toggle("show");

            window.onclick = function (e) {
                if (!e.target.matches('.dropbtn')) {
                    var myDropdown = document.getElementById("myDropdown");
                    if (myDropdown.classList.contains('show')) {
                        myDropdown.classList.remove('show');
                    }
                }
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
    height: $height-header-bar;
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

.dropdown {
    display: flex;

    .dropbtn {
        cursor: pointer;
        border: none;
        outline: none;
        color: $white-color;
        margin: 0;
        font-size: 1.2rem;
    }

    .dropdown-content {
        display: none;
        flex-direction: column;
        position: absolute;
        margin-top: $height-header-bar;
        background-color: $background-color-dropdown-menu;
        min-width: calc(100% - 22px);
        border-radius: 4px;
        text-align: right;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1051;

        .dropdown-content-text {
            font-size: 1.1rem;
            color: $white-color;
            line-height: 1.5;
            text-align: center;
            text-decoration: none;
            letter-spacing: 0.02em;
            padding: 10px;
            border-radius: 4px;

            &:hover {
                background-color: $primary-color;
            }
        }

        &.show {
            display: flex;
            animation: showDropdownContent ease-in-out .3s;
        }

    }
}

@keyframes showDropdownContent {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>

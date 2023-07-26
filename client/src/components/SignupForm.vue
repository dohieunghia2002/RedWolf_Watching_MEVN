<template>
    <div class="signup-form modal fade" id="modal-signup-form" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <form method="POST" @submit.prevent="register()">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <div class="modal-title w-100 font-weight-bold">
                            <img src="@/assets/images/logo-red-wolf.png" class="w-50" alt="logo">
                        </div>
                        <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mx-4">
                        <div class="md-form mb-4">
                            <font-awesome-icon :icon="['fas', 'user']" /> <span class="ml-2"></span>
                            <label data-error="wrong" data-success="right" for="fullname">Your fullname</label>
                            <input type="text" id="fullname" class="form-control validate" v-model="fullName">
                        </div>

                        <div class="md-form mb-4">
                            <font-awesome-icon :icon="['fas', 'user']" /> <span class="ml-2"></span>
                            <label data-error="wrong" data-success="right" for="username2">Your username</label>
                            <input type="text" id="username2" class="form-control validate" v-model="username">
                        </div>

                        <div class="md-form mb-4">
                            <font-awesome-icon :icon="['fas', 'key']" /> <span class="ml-2"></span>
                            <label data-error="wrong" data-success="right" for="password2">Your password</label>
                            <input type="password" id="password2" class="form-control validate" v-model="password">
                        </div>

                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button type="submit" class="btn btn-default btn-submit-form">Sign up</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user.js';
export default {
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    data() {
        return {
            fullName: '',
            username: '',
            password: ''
        }
    },
    methods: {
        async createForm() {
            var form = new FormData()
            form.append('fullName', this.fullName)
            form.append('username', this.username)
            form.append('password', this.password)
            return form;
        },
        async register() {
            try {

                var data = {}
                data.fullName = this.fullName;
                data.username = this.username;
                data.password = this.password;

                console.log(data)
                await this.userStore.register(data);
            } catch (e) { console.log(e) }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/signinForm.scss';
</style>
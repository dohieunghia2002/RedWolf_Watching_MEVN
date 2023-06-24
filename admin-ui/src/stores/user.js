import { defineStore } from 'pinia';
import userService from '@/services/user.service.js';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            admin: null,
            isLoggedin: false,
            formLogin: {
                username: '',
                password: ''
            },
        }
    },

    actions: {
        async loginUser() {
            try {
                const res = await userService.login(this.formLogin);
                if (res.status === 201) {
                    if (res.data.isAdmin === true) {
                        this.admin = res.data;
                        this.isLoggedin = true;
                        this.formLogin = {};
                        location.reload();
                    }
                    else {
                        alert('You are unauthorized!')
                    }
                }

                else if (res.data.status === 400) {
                    alert("Sai tài khoản hoặc mật khẩu");
                }
            } catch (error) {
                console.log(error);
                alert("Sai tài khoản hoặc mật khẩu");
            }
        },
    },

    persist: {
        key: 'admin',
        paths: ['admin', 'isLoggedin'],
        storage: sessionStorage
    }
});
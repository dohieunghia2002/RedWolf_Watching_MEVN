import { defineStore } from 'pinia';

import userService from '@/services/user.service.js';


export const useUserStore = defineStore('user', {
    state: () => {
        return {
            account: null,
            isLoggedin: false,
            formLogin: {
                username: '',
                password: ''
            },

            formRegister: {
                fullName: '',
                username: '',
                password: ''
            },

            updateForm: {}
        }
    },

    actions: {
        async register(form) {
            try {
                const res = await userService.register(form)
                if (res.status === 201) {
                    $("#modal-signup-form").on('hide.bs.modal', function () {
                        alert('Đăng ký thành công');
                    });
                }
                else if (res.status === 400) {
                    window.alert("Đăng ký thất bại");
                }
            } catch (e) {
                console.log(e);
            }

        },

        async loginUser() {
            try {
                const res = await userService.login(this.formLogin);
                if (res.status === 201) {
                    this.account = res.data;
                    this.isLoggedin = true;
                    this.formLogin = {}
                    $('#modal-signin-form').modal({
                        keyboard: false
                    })
                    $('#modal-signin-form').modal('toggle');
                    $('.modal-backdrop').remove();
                }

                else if (res.data.status === 400) {
                    alert("Sai tài khoản hoặc mật khẩu");
                }
            } catch (error) {
                console.log(error);
                alert("Sai tài khoản hoặc mật khẩu");
            }
        },

        getNameFileImg() {
            let file = document.getElementById('pathURL');
            file.addEventListener('input', () => {
                this.updateForm.image = file.files[0].name;
                this.account.image = file.files[0].name;
            });
        },

        async updateInfo() {
            this.updateForm.userID = this.account._id;
            this.updateForm.email = this.account.email;
            this.updateForm.profession = this.account.profession;
            this.updateForm.phone = this.account.phone;
            this.updateForm.placeBirth = this.account.placeBirth;

            const res = await userService.update(this.updateForm, this.account.token);

            if (res.status == 200) {
                window.alert('Update successfully')
            }
        },

        async logout() {
            sessionStorage.clear();
            this.account = null;
            this.isLoggedin = false;
        },
    },

    persist: {
        key: 'membership',
        paths: ['account', 'isLoggedin'],
        storage: sessionStorage
    }
});
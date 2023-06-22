<template>
    <div class="my-profile">
        <div class="container my-4 text-light border border-white">
            <div class="row my-4">
                <div class="col-lg-8 order-lg-2">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a href="" data-target="#profile" data-toggle="tab" class="nav-link active">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a href="" data-target="#update" data-toggle="tab" class="nav-link">Update</a>
                        </li>
                    </ul>
                    <div class="tab-content py-4">
                        <div class="tab-pane active" id="profile">
                            <h3 class="mb-3 font-weight-bold">User Profile</h3>
                            <div class="row">
                                <div class="col-md-7">
                                    <h4 class="font-weight-bold">About</h4>
                                    <p class="font-weight-bold">
                                        Name: {{ userStore.account.fullName }}
                                    </p>
                                    <h6 v-if="userStore.account.profession">Profession</h6>
                                    <p>
                                        {{ userStore.account.profession }}
                                    </p>
                                    <p v-if="userStore.account.placeBirth">
                                        Place of Birth: {{ userStore.account.placeBirth }}
                                    </p>
                                </div>

                                <div class="col-md-5">
                                    <h4 class="font-weight-bold" v-if="userStore.account.email"> Contact </h4>
                                    <p v-if="userStore.account.email">
                                        <font-awesome-icon :icon="['fas', 'envelope']" />
                                        {{ userStore.account.email }}
                                    </p>
                                    <p v-if="userStore.account.phone">
                                        <font-awesome-icon :icon="['fas', 'phone']" />
                                        {{ userStore.account.phone }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="update">
                            <form role="form" method="POST" @submit.prevent="userStore.updateInfo()">
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Email</label>
                                    <div class="col-lg-9">
                                        <input class="form-control" type="email" placeholder="My email"
                                            v-model="userStore.account.email">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Profession</label>
                                    <div class="col-lg-9">
                                        <input class="form-control" type="text" placeholder="My job"
                                            v-model="userStore.account.profession">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Phone number</label>
                                    <div class="col-lg-9">
                                        <input class="form-control" type="text" v-model="userStore.account.phone">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Place of origin</label>
                                    <div class="col-lg-9">
                                        <input class="form-control" type="text" placeholder="City"
                                            v-model="userStore.account.placeBirth">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label" for="pathURL">
                                        Upload avatar
                                    </label>
                                    <div class="col-lg-9">
                                        <input type="file" name="name-file" id="pathURL"
                                            @click="userStore.getNameFileImg()">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9 d-flex justify-content-end">
                                        <input type="reset" class="btn btn-secondary mr-2" value="Cancel">
                                        <input type="submit" class="btn btn-primary" value="Save Changes">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 order-lg-1 text-center">
                    <div v-if="userStore.account.image">
                        <img :src="userStore.pathImageUser + userStore.account.image" class="mx-auto img-fluid d-block"
                            alt="avatar">
                    </div>
                    <div v-else>
                        <img src="../assets/images/member/User-avatar.svg.png" class="mx-auto img-fluid d-block h-75"
                            alt="avatar default">
                    </div>
                </div>
            </div>
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
}
</script>

<style lang="scss" scoped></style>
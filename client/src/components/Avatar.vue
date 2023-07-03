<template>
    <VueAvatar :username="getName" />
</template>
<script>
export default {
    props: ['fullName'],

    computed: {
        getName() {
            const name = this.fullName.split(' ');
            return name[name.length - 1];
        }
    },

    async created() {
        console.log(this.fullName);
    },
}
</script>
<style lang="scss" scoped></style>
<template>
    <VueAvatar :username="name" style="width: 70px; height: 100%; padding: 3px 2px;" />
</template>
<script>
export default {
    props: ['name'],

    async created() {
        console.log(this.name);
    },
}
</script>
<style lang="scss" scoped></style>
<template>
    <v-app dark>
        <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
        </h1>
        <h1 v-else v-html="otherError"></h1>
        <NuxtLink to="/"> Home Page </NuxtLink>
    </v-app>
</template>

<script>
export default {
    layout: "empty",
    props: {
        error: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            pageNotFound: "404 Not Found",
            otherError:
                "データの読み込みに失敗しました。<br>ホーム画面に戻って操作をやり直してください。",
        };
    },
    head() {
        const title =
            this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
        return {
            title,
        };
    },
};
</script>

<style scoped>
h1 {
    font-size: 30px;
}
@media screen and (max-width: 600px) {
    h1 {
        font-size: 20px;
    }
}
</style>

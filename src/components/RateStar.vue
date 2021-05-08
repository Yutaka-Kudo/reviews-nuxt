<template>
    <v-rating
        class="rate"
        size="18"
        dense
        color="orange"
        background-color="grey"
        half-increments
        readonly
        :value="value | rate_for_star"
    ></v-rating>
</template>

<script>
import RateStar from "~/components/RateStar.vue";
export default {
    components: {
        RateStar,
    },
    props: {
        value: String,
    },
    filters: {
        rate_for_star(text) {
            //数値じゃなきゃ怒られる。
            return Number(Number(text).toFixed(1));
        },
    },
};
</script>

<style scoped>
.rate {
    display: inline-block;
}
</style>
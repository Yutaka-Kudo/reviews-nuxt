<template>
    <div class="text-center d-flex align-center justify-space-around">
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <span class="store_name d-sm-none" v-bind="attrs" v-on="on">{{ store_name | store_name_view_xs  }}</span>
                <span class="store_name d-none d-sm-flex" v-bind="attrs" v-on="on">{{ store_name | store_name_view_sm  }}</span>
            </template>
            <span>{{ store_name }}</span>
        </v-tooltip>
    </div>
</template>

<script>
export default {
    props: {
        store_name: String,
    },
    filters: {
        store_name_view_xs(text) {
            return text.length > 32 ? text.slice(0, 32) + "..." : text;
        },
        store_name_view_sm(text) {
            return text.length > 42 ? text.slice(0, 42) + "..." : text;
        },
    },
};
</script>

<style scoped>
.store_name{
    word-break: keep-all;
}
</style>
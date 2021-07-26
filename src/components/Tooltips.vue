<template>
    <div class="tooltip text-center d-flex align-center justify-space-around">
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <span class="store_name d-sm-none" v-bind="attrs" v-on="on">
                    {{ store_name | store_name_view_xs }}
                </span>
                <span
                    class="store_name d-none d-sm-flex"
                    v-bind="attrs"
                    v-on="on"
                >
                    <span>
                        {{ store_name }}
                    </span>
                </span>
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
            return text.length > 36 ? text.slice(0, 36) + "..." : text;
        },
    },
};
</script>

<style scoped>
span {
    display: inline-block;
}
.tooltip {
    overflow: hidden;
}
.store_name {
    overflow: hidden;
}
@media screen and (min-width: 960px) {
    .store_name span {
        word-break: break-word;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
@media screen and (max-width: 960px) {
    .store_name span {
        word-break: normal;
    }
}
</style>
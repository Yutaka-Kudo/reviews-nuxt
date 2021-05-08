<template>
    <div class="text-center d-flex align-center justify-space-around">
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">{{ store_name | store_name_view  }}</span>
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
        store_name_view(text) {
            return text.length > 28 ? text.slice(0, 28) + "..." : text;
        },
    },
};
</script>
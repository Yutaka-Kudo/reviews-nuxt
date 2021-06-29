<template>
    <div>
        <v-card>現在登録数</v-card>
        <v-card
            v-for="area_detail in area_detail_list"
            :key="area_detail.id"
            class="item mb-15"
            elevation="3"
            outlines
            v-cloak
        >
            <v-card-title>
                {{ area_detail.m_area_name }}
            </v-card-title>
            <div class="d-flex flex-wrap">
                <div
                    v-for="city in area_detail.include_cities"
                    :key="city.id"
                    class="pa-2"
                >
                    <!-- <span v-if="area_detail.id == city.major_area"> -->
                    <span>
                        {{ city.area_name | city_name }}
                        {{ city.registed }}店舗
                    </span>
                    <!-- </span> -->
                    <nuxt-link :to="city.id + '/ranking'"
                        >口コミランキング</nuxt-link
                    >
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        area_detail_list: Array,
    },

    filters: {
        city_name(text) {
            return text.split(" ").slice(-1)[0];
        },
    },
};
</script>

<style scoped>
.item {
    background-color: rgba(250, 226, 222, 0.9);
}
</style>
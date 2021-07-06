<template>
    <div>
        <v-card class="d-flex justify-center mb-15"
            ><h1 style="font-size: 1.6em">
                地域別<br />口コミランキング<span style="font-size: 20px"
                    >(現在登録数)</span
                >
            </h1></v-card
        >
        <v-card
            v-for="area_detail in area_detail_list"
            :key="area_detail.id"
            class="item mb-15"
            elevation="3"
            outlines
            v-cloak
        >
            <v-card-title>
                <h2 style="font-size:1.3em;">
                    {{ area_detail.m_area_name }}
                </h2>
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
                        <nuxt-link :to="city.id + '/ranking'"
                            >({{ city.registed }}店舗)</nuxt-link
                        >
                    </span>
                    <!-- </span> -->
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
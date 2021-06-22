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
                <div v-for="city in area_detail.include_cities" :key="city.id" class="pa-2">
                    <!-- <span v-if="area_detail.id == city.major_area"> -->
                        {{ city.area_name | city_name }}
                        {{city.registed}}
                    <!-- </span> -->
                    <nuxt-link :to="city.id+'/ranking'">TOP20</nuxt-link>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        m_area_list: Array,
        area_list: Array,
        area_detail_list: Array,
    },

    methods:{
        async go_store_list(city){
            let store_list = await this.$axios.get(`api/stores/?area=${city.id}`)
            console.log(store_list.data);
            console.log(city.id);
            this.$store.commit("set_store_list", store_list.data);
            this.$store.commit("set_selected_area", city.area_name);
            // axiosより後じゃないと動作しない↓
            this.$router.push({ path: `store_list/` });

        }
    },

    filters: {
        city_name(text) {
            return text.split(" ").slice(-1)[0];
        },
    },
};
</script>
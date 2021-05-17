<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <AreaSearch :area_list="area_list" @get_area_obj="get_area_obj" />
            <StoreSearch :store_list="store_list" @get_ref="get_ref" />

            <!-- <div class="text-center"> -->
                <!-- <logo /> -->
                <!-- <vuetify-logo /> -->
            <!-- </div> -->
        </v-col>
    </v-row>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import AreaSearch from "~/components/AreaSearch.vue";
import StoreSearch from "~/components/StoreSearch.vue";

import * as algoliasearch from "algoliasearch";
import config from "/algolia.config.js"
const client = algoliasearch(config.appId, config.apiKey)
const index = client.initIndex("restaurant")

export default {
    components: {
        Logo,
        VuetifyLogo,
        AreaSearch,
        StoreSearch,
    },
    data() {
        return {
            area_list: [],
            store_list: [],
            review_obj_list: [],
            ref: "",
        };
    },

    async fetch({ store, $axios }) {
        const res = await $axios
            .get("area/")
            .catch(function (e) {
                console.log(e);
            });
        store.commit("set_area_list", res.data);
    },

    async asyncData({ $axios, $store }) {
        console.log(
            `I am rendered on the ${process.client ? "client" : "server"}`
        );

        // console.log(res.data);
        // return { area_list: res.data };
    },

    created: function () {
        this.area_list = this.$store.getters["area_list"];
    },

    mounted:function(){
        this.store_list = this.$store.getters["store_list"].length ? this.$store.getters["store_list"] : [];
    },

    methods: {
        // area_idからstoreのリストを取る
        get_area_obj: function (obj) {
            let that = this;
            console.log(obj.id, obj.area_name);

            // create_store_list
            this.$axios
                .get(`stores/?area=${obj.id}`)
                .then(function (res) {
                    that.store_list = res.data;
                })
                .catch(function (e) {
                    console.log(e);
                });

            this.ref.focus(); // 店名入力フォームにフォーカス
        },

        get_ref: function (obj) {
            this.ref = obj;
        },
    },
};
</script>

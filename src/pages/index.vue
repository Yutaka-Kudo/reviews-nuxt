<template>
    <v-container class="index_wrap">
        <div class="description">
            RESTAURARY(レストラリー)で、飲食店の評価・口コミ(レビュー)を最新順でCheck
            気になってるお店の最近の情報がまるはだか！
        </div>
        <div class="search_list_wrap">
            <v-container>
                <v-row class="flex-column">
                    <v-col cols="12" md="6">
                        <AreaSearch
                            :area_list="area_list"
                            @get_area_obj="get_area_obj"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <StoreSearch
                            :store_list="store_list"
                            @get_ref="get_ref"
                        />
                    </v-col>
                </v-row>
            </v-container>
            <!-- <template> </template> -->
        </div>
    </v-container>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import AreaSearch from "~/components/AreaSearch.vue";
import StoreSearch from "~/components/StoreSearch.vue";
import { gsap } from "gsap";

export default {
    components: {
        Logo,
        VuetifyLogo,
        AreaSearch,
        StoreSearch,
    },
    // layout: "index",
    data() {
        return {
            area_list: [],
            store_list: [],
            review_obj_list: [],
            ref: "",
            // bg_img: require("@/assets/img/salad.jpg"),
        };
    },

    async fetch({ store, $axios }) {
        const res = await $axios.get("api/area/").catch(function (e) {
            // console.log(e);
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

    created: async function () {
        if (process.server) {
            // console.log('serrrrrrrrrr');
        }
        if (process.client) {
            // console.log('cliennnnnnn');
            this.area_list = this.$store.getters["area_list"];
        }

        // const res = await this.$axios.get("area/").catch(function (e) {
        //     console.log(e);
        // });
        // this.$store.commit("set_area_list", res.data);
        // this.area_list = res.data
        // console.log(this.area_list);
    },

    mounted() {
        // gsap.to(".hello", { rotation: 27, x: 100, duration: 1 });
        // gsap.to(".hello", { x: 100, duration: 3 });
    },

    // ページ帰還時にリストを保持 いらないかも
    // mounted: function () {
    //     this.store_list = this.$store.getters["basis_store_list"].length
    //         ? this.$store.getters["basis_store_list"]
    //         : [];
    // },

    methods: {
        // area_idからstoreのリストを取る
        get_area_obj: function (obj) {
            let that = this;
            console.log(obj.id, obj.area_name);

            // create_store_list
            this.$axios
                .get(`api/stores?area=${obj.id}`)
                .then(function (res) {
                    that.store_list = res.data;
                })
                .catch(function (e) {
                    console.log(e);
                });

            this.ref.focus(); // 店名入力フォームにフォーカス

            // this.$store.commit(`set_basis_store_list`, that.store_list);
        },

        get_ref: function (obj) {
            this.ref = obj;
        },
    },
    transition: {
        // name:"bounce"
        // name: "blind",
        name: "scroll",
        // mode: "in-out",
        // mode: "out-in",
        mode: "",
    },
};
</script>

<style scoped>
.bg {
    /* height: 100%; */
    /* height: calc(100vh - 40px); */
}
.container{
    /* height: 100%; */
}
.description {
    background-color: rgba(255, 255, 255, 0.3);
    /* border-color: rgba(255, 255, 255, 0.3); */
}
.search_list_wrap {
    padding-top: 70px;
    /* height: calc(100vh - 40px); */
    /* height: 100vh; */
    /* overflow: scroll; */
}

.scroll-enter-active {
    /* animation: scroll-in 0.8s; */
    /* transform-origin: left; */
    transition: all 1s;
}

.scroll-leave-active {
    /* animation: scroll-in 0.8s; */
    /* transform-origin: left; */
    transition: all 1s;
    position: absolute;
}
.scroll-enter,
.scroll-leave-to {
    transform: translateX(-120%);
}

.scroll-leave {
    transform: translateX(0px);
}

@media screen and (max-width: 960px) {
    .index_wrap{
        display: flex;
        flex-direction: column;
    }
    .search_list_wrap {
        /* height: 90vh; */
        /* flex-grow: 1; */
    }
}
</style>
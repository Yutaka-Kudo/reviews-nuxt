<template>
    <v-container class="index_wrap">
        <div class="description">
            飲食店総合口コミまとめサイト
            レストラン・居酒屋・飲食店・デリバリーの口コミ・レビューを最新順でCheck！店舗型レストランはもちろん、デリバリー専門店も検索可能。気になってるお店の使える情報をさくっとGET！
        </div>
        <div class="search_list_wrap">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6">
                        <AreaSearch
                            :area_list="area_list"
                            @get_area_obj="get_area_obj"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <StoreSearch
                            @get_ref="get_ref"
                            :submit_enable_flg="submit_enable_flg"
                            :store_list="store_list"
                        />
                    </v-col>
                </v-row>
            </v-container>
            <!-- <template> </template> -->
        </div>
        <div class="registerd_area">
            <RegisteredArea
                :m_area_list="m_area_list"
                :area_list="area_list"
                :all_store_list="all_store_list"
            />
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
            submit_enable_flg: true,
            all_store_list: [],
        };
    },

    async fetch({ store, $axios }) {
        const res = await $axios.get("api/area/").catch(function (e) {
            console.log(e);
        });
        store.commit("set_area_list", res.data);

        // let stores_res = await $axios.get("api/stores/?area=2").catch(function (e) {
        //     console.log(e);
        // });
        // let stores_res2 = await $axios.get("api/stores/?area=12").catch(function (e) {
        //     console.log(e);
        // });
        // let aaa = []
        // aaa.push(stores_res.data)
        // aaa.push(stores_res2.data)
        // store.commit("set_all_store_list", stores_res.data);
    },

    async asyncData({ $axios, $store }) {
        console.log(
            `I am rendered on the ${process.client ? "client" : "server"}`
        );

        const m_area_res = await $axios
            .get("api/area_major/")
            .catch(function (e) {
                console.log(e);
            });
        const m_area_list = m_area_res.data;

        return {
            m_area_list,
            // all_store_list,
        };

        // console.log(res.data);
        // return { area_list: res.data };
    },

    created: async function () {
        // if (process.client) {
        // // if (process.server) {
        //     // サンプル {県名:〜県,内包市:[{市名:〜市,件数:〜件},{},{}]}
        //     // console.log(this.m_area_list);
        //     console.log("serrrrrrrrrr");
        //     // let all_store_list = []
        //     let that = this
        //     for (let m_area of this.m_area_list) {
        //         let temp = {};
        //         // let area_res = await this.$axios
        //         await this.$axios
        //             .get(`api/area/?major_area=${m_area.id}`)
        //             .then(function(area_res){
        //                 temp["m_area_name"] = m_area["area_name"];
        //                 temp["include_cities"] = area_res.data;
        //                 // console.log(area_res.data);
        //                 that.all_store_list.push(temp)

        //                 for (let city of temp["include_cities"]) {
        //                     // console.log(city["area_name"]);
        //                     // let store_res =  this.$axios
        //                     that.$axios
        //                         .get(`api/stores/?area=${city.id}`)
        //                         .then(function(store_res){
        //                             city["num_of_registed"] = store_res.data.length
        //                             console.log(city);

        //                         })
        //                         .catch(function (e) {
        //                             console.log(e);
        //                         });
        //                     // this.all_store_list = temp

        //                     // console.log(this.all_store_list);
        //                 }
        //             })
        //             .catch(function (e) {
        //                 console.log(e);
        //             });
        //         // this.all_store_list
        //         // console.log(res.data);
        //         // console.log(temp);
        //     }
        // }
        if (process.client) {
            // if (process.server) {
            // サンプル {県名:〜県,内包市:[{市名:〜市,件数:〜件},{},{}]}
            // console.log(this.m_area_list);
            console.log("serrrrrrrrrr");
            // let all_store_list = []
            // let that = this;
            // for (let m_area of this.m_area_list) {
            //     let temp = {};
            //     // let area_res = await this.$axios
            //     let area_res = await this.$axios
            //         .get(`api/area/?major_area=${m_area.id}`)
            //         .catch(function (e) {
            //             console.log(e);
            //         });
            //     temp["m_area_name"] = m_area["area_name"];
            //     temp["include_cities"] = area_res.data;
            //     // console.log(area_res.data);
            //     for (let city of temp["include_cities"]) {
            //         // console.log(city["area_name"]);
            //         // let store_res =  this.$axios
            //         all_stores = this.$store.getters["all_store_list"]

            //                 .then(function (store_res) {
            //                     city["num_of_registed"] = store_res.data.length;
            //                     console.log(city);
            //                 })
            //         // this.all_store_list = temp

            //         // console.log(this.all_store_list);
            //     }
            //     that.all_store_list.push(temp);

            // this.all_store_list = this.$store.getters["all_store_list"]

                // this.all_store_list
                // console.log(res.data);
                // console.log(temp);
            // }
        }
        if (process.client) {
            // ページ戻った時にリストを保持する
            this.area_list = this.$store.getters["area_list"];
            this.store_list = this.$store.getters["basis_store_list"];
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

        this.update_header();
    },

    methods: {
        // area_idからstoreのリストを取る
        get_area_obj: function (obj) {
            this.submit_enable_flg = false;
            let that = this;
            console.log(obj.id, obj.area_name);

            // create_store_list
            // this.store_list = this.all_store_list.filter(v => v.area.id === obj.id)
            // this.$store.commit("set_basis_store_list", this.store_list);
            // this.submit_enable_flg = true;
            this.$axios
                .get(`api/stores?area=${obj.id}`)
                .then(function (res) {
                    that.store_list = res.data;
                    that.$store.commit("set_basis_store_list", res.data);
                    that.submit_enable_flg = true;
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

        update_header() {
            this.$nuxt.$emit("update_header", "index");
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
.container {
    /* height: 100%; */
}
.description {
    background-color: rgba(255, 255, 255, 0.6);
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
    .index_wrap {
        display: flex;
        flex-direction: column;
    }
    .search_list_wrap {
        /* height: 90vh; */
        /* flex-grow: 1; */
    }
}
</style>
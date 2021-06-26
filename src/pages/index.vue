<template>
    <v-container class="index_wrap">
        <div class="description">
            飲食店総合口コミまとめサイト
            レストラン・居酒屋・飲食店・デリバリーの口コミ・レビューを最新順でCheck！店舗型レストランはもちろん、デリバリー専門店も検索可能。気になるお店の情報をさくっとGET！
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
                            :submit_desable_flg="submit_desable_flg"
                            :store_list="store_list"
                        />
                    </v-col>
                </v-row>
            </v-container>
            <!-- <template> </template> -->
        </div>
        <div class="registerd_area">
            <RegisteredArea
                :area_detail_list="area_detail_list"
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
            submit_desable_flg: false,
            area_detail_list: [],
        };
    },

    async fetch({ store, $axios }) {
        // const res = await $axios.get("api/area/").catch(function (e) {
        //     console.log(e);
        // });
        // store.commit("set_area_list", res.data);
    },

    async asyncData({ $axios, store }) {
        console.log(
            `I am rendered on the ${process.client ? "client" : "server"}`
        );

        // サンプル {県名:〜県,内包市:[{市名:〜市,件数:〜件},{},{}]}
        const m_area_list = await $axios
            .get("api/area_major/")
            .then(function (res) {
                return res.data;
            })
            .catch(function (e) {
                console.log(e);
            });
        const area_list = await $axios
            .get(`api/area/`)
            .then(function (res) {
                return res.data;
            })
            .catch(function (e) {
                console.log(e);
            });

        let area_detail_list = [];
        for (let m_area of m_area_list) {
            let temp = {};
            temp["m_area_name"] = m_area["area_name"];
            temp["include_cities"] = area_list.filter(
                (v) => v.major_area == m_area.id
            );
            area_detail_list.push(temp);
        }

        return {
            area_list,
            area_detail_list,
        };
    },

    created: async function () {
        if (process.client) {
            this.$store.commit("set_area_list", this.area_list);

            // ページ戻った時にリストを保持する
            this.area_list = this.$store.getters["area_list"];
            this.store_list = this.$store.getters["basis_store_list"];
        }
    },

    mounted() {
        // gsap.to(".hello", { rotation: 27, x: 100, duration: 1 });
        // gsap.to(".hello", { x: 100, duration: 3 });

        this.update_header("index");

        this.$store.watch(
            (state,getters)=>getters.basis_store_list,
            (newVal,oldVal)=>{
                this.store_list = newVal
                this.submit_desable_flg = false
            }
        )
    },

    methods: {
        update_header(flg) {
            this.$nuxt.$emit("update_header", flg);
        },

        // area_idからstoreのリストを取る
        get_area_obj: function (obj) {
            this.submit_desable_flg = true;
            console.log(obj.id, obj.area_name);
            this.$store.commit("set_selected_area", obj);

            this.update_header("set_store_list")

            this.ref.focus(); // 店名入力フォームにフォーカス
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
    head: {
        titleTemplate: null,
        title: "RESTAURary 飲食店口コミ総合まとめ ~レストラリー~",
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
    width: 88%;
    margin: 0 auto;
}
.search_list_wrap {
    padding-top: 10px;
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
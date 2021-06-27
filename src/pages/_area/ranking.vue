<template>
    <div class="bg store_list_wrap">
        <v-container>
            <v-card class="ranking_head mb-10 d-flex justify-center">
                <h1>レビューランキングTop20</h1>
            </v-card>
            <ShowStoreList
                :media_data_list_by_store="media_data_list_by_store"
                :content_list="content_list"
                :seen_whole="seen_whole"
            />
        </v-container>
    </div>
</template>

<script>
import ShowStoreList from "~/components/ShowStoreList.vue";
// import Meta from '~/assets/mixins/meta'

export default {
    // mixins: [Meta], //mixinsの使い方
    components: {
        ShowStoreList,
    },

    // scrollToTop:true,

    data() {
        return {
            media_data_list_by_store: [],
            // media_data_list_by_store_next: [],
            content_list: [],
            content_list_next: [],
            seen_whole: true,
            selected_area: {},
        };
    },

    async asyncData({ $axios, store, route }) {
        let area_list = await $axios
            .get("api/area/")
            .then(function (res) {
                return res.data;
            })
            .catch(function (e) {
                console.log(e);
            });

        let selected_area = area_list.find((v) => v.id == route.params.area);
        console.log("slelctlek", selected_area);

        let response = await $axios
            .get(`api/stores?area=${route.params.area}`)
            .then(function (res) {
                // ランキングにのせる店のレビュー数の最低ライン
                let _store_list = res.data.filter(
                    (v) => v["total_review_count"] >= 20
                );
                // レート順並び替え
                _store_list.sort((x, y) => {
                    if (Number(x["total_rate"]) > Number(y["total_rate"])) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                return {
                    // 上から20こ
                    store_list: _store_list.slice(0, 20),
                    basis_store_list: res.data,
                };
            })
            .catch(function (e) {
                console.log(e);
            });
        // console.log('respo',response.store_list);
        // console.log('respo',response.basis_store_list);
        return {
            selected_area: selected_area,
            basis_store_list: response.basis_store_list,
            store_list: response.store_list,
        };
    },

    async fetch({ $axios, store, route }) {
        // await store.dispatch(`set_area_listAction`)
        // let area_list =  await $axios.get(`api/area/`).then(function (res) {
        //     return res.data
        // })
        // store.commit("set_area_list", area_list);
        // let area_list = store.getters["area_list"];
        // let selected_area = area_list.find((v) => v.id == route.params.area);
        // store.commit("set_selected_area", selected_area);
        // console.log("slelctlek", store.getters["selected_area"]);
        // await $axios
        //     .get(`api/stores?area=${route.params.area}`)
        //     .then(function (res) {
        //         // basis登録
        //         store.commit("set_basis_store_list", res.data);
        //     })
        //     .catch(function (e) {
        //         console.log(e);
        //     });
    },

    created: async function () {
        // if (process.server) {
        if (process.client) {
            console.log("crecre");

            // selected_area登録
            this.$store.commit("set_selected_area", this.selected_area);

            // basis登録
            this.$store.commit("set_basis_store_list", this.basis_store_list);

            // this.$nuxt.$emit("update_header", "store_list");

            console.log(this.selected_area);
            console.log(this.$route.params);

            await this.create_data(this.store_list);

            console.log(
                "media_data_list_by_store",
                this.media_data_list_by_store
            );

            console.log("content_list", this.content_list);
        }
    },

    mounted: async function () {
        console.log("moumoummou");
        this.$nuxt.$emit("update_header", "store_list");

        console.log(this.$route.params);
    },

    methods: {
        create_data: async function (sliced_store_list, next_flg = false) {
            // this.$nuxt.$loading.start();
            // let that = this;

            if (!next_flg) {
                this.media_data_list_by_store.splice(0);
                this.content_list.splice(0);
            } else {
                this.media_data_list_by_store_next.splice(0);
                this.content_list_next.splice(0);
            }

            for (var i in sliced_store_list) {
                var store_data = sliced_store_list[i];
                let media_data_temp = [];

                let store_res = await this.$axios
                    .get(`api/stores?id=${store_data.id}`)
                    .catch(function (e) {
                        console.log(e);
                    });

                let res = await this.$axios
                    .get(`api/media_data?store=${store_data.id}`)
                    .catch(function (e) {
                        console.log(e);
                    });

                res.data["category"] = [
                    store_res.data[0].category1,
                    store_res.data[0].category2,
                    store_res.data[0].category3,
                ];
                res.data["yomigana"] = store_res.data[0].yomigana;
                res.data["loading"] = true;
                media_data_temp = res.data;

                // 成形
                //uberOnlyフラグーーーー
                media_data_temp["uber_only"] =
                    media_data_temp.map((v) => v["media_type"]["media_type"]) ==
                    "uber"
                        ? true
                        : false; //なぜか配列同士の比較はfalseになる。

                // 並び替えーーーーーー
                let junban = [
                    "google",
                    "tb",
                    "hp",
                    "gn",
                    "retty",
                    "uber",
                    "demaekan",
                    "foodpanda",
                ];
                media_data_temp.sort(
                    (x, y) =>
                        junban.indexOf(x["media_type"]["media_type"]) -
                        junban.indexOf(y["media_type"]["media_type"])
                );

                if (!next_flg) {
                    this.media_data_list_by_store.push(media_data_temp);
                } else {
                    this.media_data_list_by_store_next.push(media_data_temp);
                }
                // }
                // console.log(JSON.stringify(this.media_data_list_by_store));

                let content_list_temp = [];
                for (var media_data of media_data_temp) {
                    // await this.$axios
                    let res = await this.$axios
                        // this.$axios
                        .get(`api/reviews?media=${media_data.id}`)
                        .catch(function (e) {
                            console.log(e);
                        });
                    //本文を集める
                    let contents = res.data.map(function (v) {
                        if (v.content) {
                            return {
                                store_id: v["media"]["store"]["id"],
                                store_name: v["media"]["store"]["store_name"],
                                media_type:
                                    v["media"]["media_type"]["official_name"],
                                review_date: v["review_date"],
                                review_point: v["review_point"],
                                content: v["content"],
                                seen: false,
                            };
                        }
                    });
                    content_list_temp.push(contents);
                }

                // 2次元配列を1次元に＆日付け降順
                // フラットにしてから日時順並び替え
                content_list_temp = content_list_temp.flat(1);
                content_list_temp.sort((x, y) => {
                    if (x["review_date"] > y["review_date"]) {
                        return -1;
                    } else {
                        return 1;
                    }
                });

                if (!next_flg) {
                    this.content_list.push(content_list_temp.slice(0, 6));
                    this.content_list = this.content_list.flat(1);
                    console.log("this page!!");
                } else {
                    this.content_list_next.push(content_list_temp.slice(0, 6));
                    this.content_list_next = this.content_list_next.flat(1);
                    console.log("next!!!");
                    // console.log(this.content_list_next);
                }

                // ローディング終了
                media_data_temp["loading"] = false;
            }
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
    head() {
        return {
            title: `地域別レストランランキング ${this.selected_area.area_name}`,
        };
    },
};
</script>

<style scoped>
/* .bg {
    background-color: rgba(0, 0, 0, 0);
    background-attachment: fixed;
    animation: opaMove 3s 3s forwards;
} */
.store_list_wrap {
    /* height: 100vh; */
    /* overflow: scroll; */
    /* height: calc(100vh - 40px); */
    /* overflow: scroll; */
    padding-top: 80px;
}
.store_list_wrap::-webkit-scrollbar {
    display: none;
}

@media screen and (max-width: 600px) {
    .store_list_wrap {
        padding-top: 80px;
    }
}

.ranking_head {
    /* font-size: 5vw; */
}

@keyframes opaMove {
    0% {
        background-color: rgba(0, 0, 0, 0);
    }
    100% {
        background-color: rgba(0, 0, 0, 0.5);
    }
}
.scroll-enter-active {
    /* animation: scroll-in 0.8s; */
    transition: all 1s;
}
.scroll-leave-active {
    /* animation: scroll-in 0.8s; */
    transition: all 1s;
    position: absolute;
}
.scroll-enter,
.scroll-leave-to {
    transform: translateX(120%);
    /* opacity: 0; */
}

.scroll-leave {
    /* transform: translateX(0,0); */
}
</style>
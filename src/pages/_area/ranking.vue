<template>
    <div class="bg store_list_wrap">
        <v-container>
            <v-card class="ranking_head mb-10 d-flex justify-center">
                <h1>
                    {{ this.selected_area.area_name | city_name }}
                    ランキング
                </h1>
            </v-card>
            <v-card class="mb-10 d-flex justify-center">
                <h2>
                    {{ this.selected_area.area_name }}の飲食店口コミランキング
                </h2>
            </v-card>
            <ShowStoreList
                :media_data_list_by_store="media_data_list_by_store"
                :content_list="content_list"
                :seen_whole="seen_whole"
            />
            <Pagination
                @page_change="page_change"
                :page_is_disabled="page_is_disabled"
                :page_length="page_length"
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
            media_data_list_by_store_next: [],
            content_list: [],
            content_list_next: [],
            seen_whole: true,
            selected_area: {},

            pages: {
                page_size: 10,
                now_page: 1,
                page_length: 0,
            },
            page_is_disabled: false,
        };
    },

    async asyncData({ $axios, store, route, payload }) {
        if (payload) {
            console.log("payloadldllllllllll");
            // console.log(payload["area"]);
            const selected_area = payload["area"];
            console.log("slelctlek", selected_area["area_name"]);

            let basis_store_list = payload["stores"];

            // ランキングにのせる店のレビュー数の最低ライン
            let store_list = basis_store_list.filter(
                (v) => v["total_review_count"] >= 20 && v["total_rate"] != 0
            );
            // レート順並び替え
            store_list.sort((x, y) => {
                if (Number(x["total_rate"]) > Number(y["total_rate"])) {
                    return -1;
                } else {
                    return 1;
                }
            });

            // 1ページ分store_list
            let sliced_store_list = store_list.slice(0, 10);
            let md_list = [];
            let rev_list = [];
            for (var store_data of sliced_store_list) {
                // let media_data_temp = [];

                let md_res = await $axios
                    .get(`api/media_data?store=${store_data.id}`)
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (e) {
                        console.log("axiosエラー ranking.vue 88: ", e);
                    });
                md_list.push(md_res);

                let content_res = await $axios
                    .get(`api/reviews?media__store=${store_data.id}`)
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (e) {
                        console.log("axiosエラー ranking.vue 98: ", e);
                    });
                rev_list.push(content_res);

                console.log("get md & content");
            }
            return {
                selected_area: selected_area,
                basis_store_list,
                store_list,

                md_list,
                rev_list,
            };
        } else {
            let area_list = await $axios
                .get("api/area/")
                .then(function (res) {
                    return res.data;
                })
                .catch(function (e) {
                    console.log(e);
                });
            let selected_area = area_list.find(
                (v) => v.id == route.params.area
            );
            console.log("slelctlek", selected_area);

            let { store_list, basis_store_list } = await $axios
                .get(`api/stores?area=${route.params.area}`)
                .then(function (res) {
                    // ランキングにのせる店のレビュー数の最低ライン
                    // let store_list = payload.filter(
                    let store_list = res.data.filter(
                        (v) =>
                            v["total_review_count"] >= 20 &&
                            v["total_rate"] != 0
                    );
                    // レート順並び替え
                    store_list.sort((x, y) => {
                        if (Number(x["total_rate"]) > Number(y["total_rate"])) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                    return {
                        store_list,
                        basis_store_list: res.data,
                    };
                });

            // 1ページ分store_list
            let sliced_store_list = store_list.slice(0, 10);
            let md_list = [];
            let rev_list = [];
            for (var store_data of sliced_store_list) {
                // let media_data_temp = [];

                let md_res = await $axios
                    .get(`api/media_data?store=${store_data.id}`)
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (e) {
                        console.log("axiosエラー ranking.vue 155: ", e);
                    });
                md_list.push(md_res);

                let content_res = await $axios
                    .get(`api/reviews?media__store=${store_data.id}`)
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (e) {
                        console.log("axiosエラー ranking.vue 165: ", e);
                    });
                rev_list.push(content_res);

                console.log("get md & content");
            }
            return {
                selected_area: selected_area,
                basis_store_list,
                store_list,

                md_list,
                rev_list,
            };
        }
    },

    fetch({ $axios, store, route }) {
        // console.log("ふぇっちっち");
    },

    created: async function () {
        // if (process.server) {
        if (process.client) {
            console.log("crecre");

            //ページ数、決定
            this.page_length = Math.ceil(
                this.store_list.length / this.pages["page_size"]
            );

            // this.$store.commit("set_page_length", page_length);

            // selected_area登録
            this.$store.commit("set_selected_area", this.selected_area);

            // basis登録
            this.$store.commit("set_basis_store_list", this.basis_store_list);

            let create_media_data = function (md_list, next_flg = false) {
                let media_data_temp = [];
                for (var md of md_list) {
                    md["category"] = [
                        md[0]["store"]["category1"],
                        md[0]["store"]["category2"],
                        md[0]["store"]["category3"],
                    ];
                    // md_res["yomigana"] = store_res[0].yomigana;
                    md = md;

                    // 成形
                    //uberOnlyフラグーーーー
                    md["uber_only"] =
                        md.map((v) => v["media_type"]["media_type"]) == "uber"
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
                    md.sort(
                        (x, y) =>
                            junban.indexOf(x["media_type"]["media_type"]) -
                            junban.indexOf(y["media_type"]["media_type"])
                    );

                    media_data_temp.push(md);
                }
                return media_data_temp;
            };

            this.media_data_list_by_store.push(
                ...create_media_data(this.md_list)
            );
            console.log(
                "this.media_data_list_by_store",
                this.media_data_list_by_store
            );
            // this.media_data_list_by_store_next.push(
            //     ...create_media_data(this.md_list_next, true)
            // );

            // コンテンツーーーーーーーーーー
            let create_contents = function (rev_list, next_flg = false) {
                let contents_temp = [];
                for (let rev of rev_list) {
                    let contents = rev.map(function (v) {
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

                    // 2次元配列を1次元に＆日付け降順
                    contents = contents.flat(1);
                    // 日時順並び替え
                    contents.sort((x, y) => {
                        if (x["review_date"] > y["review_date"]) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });

                    contents_temp.push(contents.slice(0, 6));
                    contents_temp = contents_temp.flat(1);
                    if (!next_flg) {
                        console.log("this page!!");
                    } else {
                        console.log("next!!!");
                    }
                }
                return contents_temp;
            };
            this.content_list.push(...create_contents(this.rev_list));
            // this.content_list_next.push(
            //     ...create_contents(this.rev_list_next, true)
            // );

            console.log(
                "media_data_list_by_store",
                this.media_data_list_by_store
            );

            console.log("content_list", this.content_list);
            let sliced_store_list_next = this.store_list.slice(10, 20);
            await this.create_data(sliced_store_list_next, true);
        }
    },

    mounted: async function () {
        console.log("moumoummou");
        this.$nuxt.$emit("update_header", "store_list");

        console.log(this.$route.params);
    },

    methods: {
        create_data: async function (sliced_store_list, next_flg = false) {
            this.page_is_disabled = true;

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

                let md_res = await this.$axios
                    .get(`api/media_data?store=${store_data.id}`)
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (e) {
                        console.log(e);
                    });

                md_res["category"] = [
                    md_res[0]["store"]["category1"],
                    md_res[0]["store"]["category2"],
                    md_res[0]["store"]["category3"],
                ];
                // md_res["yomigana"] = store_res[0].yomigana;
                md_res["loading"] = true;
                media_data_temp = md_res;

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

                // コンテンツーーーーーーーーーー
                let content_list_temp = [];
                let rev_res = await this.$axios
                    .get(`api/reviews?media__store=${store_data.id}`)
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (e) {
                        console.log(e);
                    });
                //本文を集める
                let contents = rev_res.map(function (v) {
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

                // 2次元配列を1次元に＆日付け降順
                content_list_temp = content_list_temp.flat(1);
                // 日時順並び替え
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
            this.page_is_disabled = false;
        },
        page_change: async function (page_num) {
            // 現在のページなら機能しないように
            if (this.pages["now_page"] != page_num) {
                if (this.pages["now_page"] + 1 == page_num) {
                    this.pages["now_page"] = page_num;

                    this.seen_whole = false;
                    const that = this;
                    function func() {
                        that.seen_whole = true;
                    }
                    setTimeout(func, 500);

                    this.media_data_list_by_store = [
                        ...this.media_data_list_by_store_next,
                    ];
                    this.content_list = [...this.content_list_next];

                    console.log(this.media_data_list_by_store);
                    console.log(this.content_list);
                    console.log(
                        this.media_data_list_by_store ==
                            this.media_data_list_by_store_next
                    );

                    // 次ページ分
                    let sliced_store_list_next = this.store_list.slice(
                        this.pages["page_size"] * page_num,
                        this.pages["page_size"] * (page_num + 1)
                    );

                    // 次ページ分ストック
                    await this.create_data(sliced_store_list_next, true);
                } else {
                    this.pages["now_page"] = page_num;

                    // 1ページ分store_list
                    let sliced_store_list = this.store_list.slice(
                        this.pages["page_size"] * (page_num - 1),
                        this.pages["page_size"] * page_num
                    );

                    await this.create_data(sliced_store_list);

                    // 次ページ分
                    let sliced_store_list_next = this.store_list.slice(
                        this.pages["page_size"] * page_num,
                        this.pages["page_size"] * (page_num + 1)
                    );

                    // 次ページ分ストック
                    await this.create_data(sliced_store_list_next, true);

                    // console.log(JSON.stringify(this.review_obj_list));
                }
            }
        },
    },

    filters: {
        city_name(text) {
            return text.split(" ").slice(-1)[0];
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
            title: `地域別飲食店ランキング ${this.selected_area.area_name}`,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: `どの飲食店が人気があるか気になりませんか？${this.selected_area.area_name}エリアの飲食店のGoogle、食べログ、ぐるなび、ホットペッパー等の口コミ・レビューを集計して独自のアルゴリズムでランキング形式で表示。気になってるレストランの使える情報をさくっとGET！`,
                },

                {
                    hid: "og:title",
                    property: "og:title",
                    content: `地域別飲食店ランキング ${this.selected_area.area_name}`,
                },
                {
                    hid: "og:description",
                    property: "og:description",
                    content: `どの飲食店が人気があるか気になりませんか？${this.selected_area.area_name}エリアの飲食店のGoogle、食べログ、ぐるなび、ホットペッパー等の口コミ・レビューを集計して独自のアルゴリズムでランキング形式で表示。気になってるレストランの使える情報をさくっとGET！`,
                },
            ],
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
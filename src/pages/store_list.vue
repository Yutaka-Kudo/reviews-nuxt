<template>
    <div>
        <div>
            <!-- <Tran/> -->
            <ToTop />
        </div>
        <ShowStoreList
            :media_data_list_by_store="media_data_list_by_store"
            :content_list="content_list"
        />
        <!-- <Pagination
            :page_length="pages.page_length"
            @page_change="page_change"
        /> -->
    </div>
</template>

<script>
import ShowStoreList from "~/components/ShowStoreList.vue";
import Pagination from "~/components/Pagination.vue";
// import Tran from "~/components/Tran.vue";

export default {
    components: {
        ShowStoreList,
        Pagination,
        // Tran,
    },

    data() {
        return {
            media_data_list_by_store: [],
            review_obj_list: [],
            content_list: [],
            store_list: [],
            pages: {
                page_size: 10,
                page_length: 0,
                now_page: 1,
            },
        };
    },
    methods: {
        page_change: async function (page_num) {
            // 現在のページなら機能しないように
            if (this.pages["now_page"] != page_num) {
                this.pages["now_page"] = page_num;

                let that = this;
                // console.log("mount");

                console.log(this.pages["page_length"]);
                // let sliced_store_list = this.store_list.slice(
                //     this.pages["page_size"] * (page_num - 1),
                //     this.pages["page_size"] * page_num
                // ); // 1ページ分のデータ

                // media_data取得ーーーーーーー
                this.media_data_list_by_store.splice(0);
                // for (var i in sliced_store_list) {
                //     var store_data = sliced_store_list[i];
                for(var num = 1; num <=10 ; num++){
                    await this.$axios
                        .get(
                            // `http://127.0.0.1:8000/api/media_data/?store=${store_data.id}`
                            `http://127.0.0.1:8000/api/media_data/?store=${num}`
                        )
                        .then(function (res) {
                            that.media_data_list_by_store.push(res.data);
                        })
                        .catch(function (e) {
                            console.log(e);
                        });
                }
                console.log(this.media_data_list_by_store);

                // 成形
                for (var i in this.media_data_list_by_store) {
                    let media_data = this.media_data_list_by_store[i];

                    //uberOnlyフラグーーーー
                    var media_type_list = media_data.map(
                        (v) => v["media_type"]["media_type"]
                    );
                    media_data["uber_only"] =
                        media_type_list == "uber" ? true : false; //なぜか配列同士の比較はfalseになる。

                    //total_rate出すーーーー
                    var rate_list = media_data.map((v) => Number(v.rate)); // numberにかえてarrayに収納
                    var rate_list = rate_list.filter((v) => v); // 0を除外
                    let total_rate = 0;
                    if (rate_list.length >= 1) {
                        total_rate =
                            rate_list.reduce((sum, v) => sum + v, 0) /
                            rate_list.length;
                    }
                    media_data.total_rate = total_rate.toFixed(1); //小数点以下1に

                    // 並び替えーーーーーー
                    const junban = [
                        "google",
                        "tb",
                        "hp",
                        "gn",
                        "retty",
                        "uber",
                        "demaekan",
                        "foodpanda",
                    ];
                    this.media_data_list_by_store.forEach((media_d) => {
                        media_d.sort(
                            (x, y) =>
                                junban.indexOf(x["media_type"]["media_type"]) -
                                junban.indexOf(y["media_type"]["media_type"])
                        );
                    });
                }
                // console.log(JSON.stringify(this.media_data_list_by_store));

                this.review_obj_list = [];
                this.content_list = [];
                for (var media_data_by_store of this.media_data_list_by_store) {
                    for (var media_data of media_data_by_store) {
                        await this.$axios
                            .get(
                                `http://127.0.0.1:8000/api/reviews/?media=${media_data.id}`
                            )
                            .then(function (res) {
                                that.review_obj_list.push(res.data.slice(0, 3)); // sliceで制限かける

                                //本文を集める
                                let contents = res.data.map(function (v) {
                                    if (v.content) {
                                        return {
                                            store_id: v["media"]["store"]["id"],
                                            store_name:
                                                v["media"]["store"][
                                                    "store_name"
                                                ],
                                            media_type:
                                                v["media"]["media_type"][
                                                    "official_name"
                                                ],
                                            review_date: v["review_date"],
                                            review_point: v["review_point"],
                                            content: v["content"],
                                            seen: false,
                                        };
                                    }
                                });
                                // console.log(contents);
                                that.content_list.push(contents.slice(0, 3));
                            })
                            .catch(function (e) {
                                console.log(e);
                            });
                    }
                }

                // 2次元配列を1次元に＆日付け降順
                this.content_list = this.content_list.flat(1);
                this.content_list.sort((x, y) => {
                    if (x["review_date"] > y["review_date"]) {
                        return -1;
                    } else {
                        return 1;
                    }
                });

                console.log(this.content_list);
                console.log(this.review_obj_list);
                // return this.$store.commit(
                //     "set_review_obj_list",
                //     this.review_obj_list
                // );

                // console.log(JSON.stringify(this.review_obj_list));
            }
        },
    },

    // computed: {
    //     store_list: function () {
    //         // console.log("comp");
    //         return this.$store.getters["store_list"];
    //     },
    // },

    mounted: async function () {
        console.log("parent mount");
        console.log(this);
        this.store_list = this.$store.getters["store_list"];
        let that = this;
        // console.log("mount");

        // this.pages["page_length"] = Math.ceil(
        //     this.store_list.length / this.pages["page_size"]
        // ); //ページ数、決定
        this.pages["page_length"] = 2

        // console.log(this.pages["page_length"]);
        // let sliced_store_list = this.store_list.slice(
        //     0,
        //     this.pages["page_size"]
        // ); // 1ページ分のデータ

        // media_data取得ーーーーーーー
        // for (var i in sliced_store_list) {
        for(var num = 1; num <=10 ; num++){

            // var store_data = sliced_store_list[i];
            await this.$axios
                .get(
                    // `http://127.0.0.1:8000/api/media_data/?store=${store_data.id}`
                    `http://127.0.0.1:8000/api/media_data/?store=${num}`
                )
                .then(function (res) {
                    that.media_data_list_by_store.push(res.data);
                })
                .catch(function (e) {
                    console.log(e);
                });
        }
        console.log(this.media_data_list_by_store);

        // 成形
        for (var i in this.media_data_list_by_store) {
            let media_data = this.media_data_list_by_store[i];

            //uberOnlyフラグーーーー
            var media_type_list = media_data.map(
                (v) => v["media_type"]["media_type"]
            );
            media_data["uber_only"] = media_type_list == "uber" ? true : false; //なぜか配列同士の比較はfalseになる。

            //total_rate出すーーーー
            var rate_list = media_data.map((v) => Number(v.rate)); // numberにかえてarrayに収納
            var rate_list = rate_list.filter((v) => v); // 0を除外
            let total_rate = 0;
            if (rate_list.length >= 1) {
                total_rate =
                    rate_list.reduce((sum, v) => sum + v, 0) / rate_list.length;
            }
            media_data.total_rate = total_rate.toFixed(1); //小数点以下1に

            // 並び替えーーーーーー
            const junban = [
                "google",
                "tb",
                "hp",
                "gn",
                "retty",
                "uber",
                "demaekan",
                "foodpanda",
            ];
            this.media_data_list_by_store.forEach((media_d) => {
                media_d.sort(
                    (x, y) =>
                        junban.indexOf(x["media_type"]["media_type"]) -
                        junban.indexOf(y["media_type"]["media_type"])
                );
            });
        }
        // console.log(JSON.stringify(this.media_data_list_by_store));

        this.review_obj_list.splice(0);
        for (var media_data_by_store of this.media_data_list_by_store) {
            for (var media_data of media_data_by_store) {
                await this.$axios
                    .get(
                        `http://127.0.0.1:8000/api/reviews/?media=${media_data.id}`
                    )
                    .then(function (res) {
                        that.review_obj_list.push(res.data.slice(0, 3)); // sliceで制限かける

                        //本文を集める
                        let contents = res.data.map(function (v) {
                            if (v.content) {
                                return {
                                    store_id: v["media"]["store"]["id"],
                                    store_name:
                                        v["media"]["store"]["store_name"],
                                    media_type:
                                        v["media"]["media_type"][
                                            "official_name"
                                        ],
                                    review_date: v["review_date"],
                                    review_point: v["review_point"],
                                    content: v["content"],
                                    seen: false,
                                };
                            }
                        });
                        // console.log(contents);
                        that.content_list.push(contents.slice(0, 3)); // 範囲制限
                    })
                    .catch(function (e) {
                        console.log(e);
                    });
            }
        }

        // 2次元配列を1次元に＆日付け降順
        this.content_list = this.content_list.flat(1);
        this.content_list.sort((x, y) => {
            if (x["review_date"] > y["review_date"]) {
                return -1;
            } else {
                return 1;
            }
        });

        console.log(this.content_list);
        console.log(this.review_obj_list);
        // return this.$store.commit("set_review_obj_list", this.review_obj_list);

        // console.log(JSON.stringify(this.review_obj_list));
    },
    // transition:{
    //     name:"bounce"
    // }
};
</script>

<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.8s;
}
.bounce-leave-active {
    animation: bounce-out 0.5s;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes bounce-out {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(0);
    }
}
</style>
<template>
    <div class="bg store_list_wrap">
        <v-container>
            <!-- <div> -->
            <!-- <Tran/> -->
            <!-- </div> -->

            <ShowStoreList
                :media_data_list_by_store="media_data_list_by_store"
                :content_list="content_list"
            />
            <Pagination
                :page_length="pages.page_length"
                @page_change="page_change"
            />
        </v-container>
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
        create_data: async function (sliced_store_list) {
            // this.$nuxt.$loading.start();

            console.log(sliced_store_list);
            let that = this;
            this.content_list.splice(0);

            for (var i in sliced_store_list) {
                var store_data = sliced_store_list[i];
                let media_data_temp = [];
                let res = await this.$axios
                    .get(`api/media_data?store=${store_data.id}`)
                    .catch(function (e) {
                        console.log(e);
                    });

                res.data["loading"] = true;
                media_data_temp = res.data;

                // 成形
                //uberOnlyフラグーーーー
                media_data_temp["uber_only"] =
                    media_data_temp.map((v) => v["media_type"]["media_type"]) ==
                    "uber"
                        ? true
                        : false; //なぜか配列同士の比較はfalseになる。

                //total_rate出すーーーー
                var rate_list = media_data_temp.map((v) => Number(v.rate)); // numberにかえてarrayに収納
                var rate_list = rate_list.filter((v) => v); // 0を除外
                let total_rate = 0;
                if (rate_list.length >= 1) {
                    total_rate =
                        rate_list.reduce((sum, v) => sum + v, 0) /
                        rate_list.length;
                }
                media_data_temp.total_rate = total_rate.toFixed(1); //小数点以下1に

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
                this.media_data_list_by_store.push(media_data_temp);
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
                }

                this.content_list.push(content_list_temp.slice(0, 6));
                this.content_list = this.content_list.flat(1);

                // ローディング終了
                media_data_temp["loading"] = false;
            }

            // this.$nuxt.$loading.finish();
        },

        page_change: function (page_num) {
            // 現在のページなら機能しないように
            if (this.pages["now_page"] != page_num) {
                this.pages["now_page"] = page_num;

                // console.log("mount");

                console.log(this.pages["page_length"]);
                let sliced_store_list = this.store_list.slice(
                    this.pages["page_size"] * (page_num - 1),
                    this.pages["page_size"] * page_num
                ); // 1ページ分のデータ

                this.media_data_list_by_store.splice(0);
                // media_data取得ーーーーーーー
                this.create_data(sliced_store_list);

                // console.log(this.content_list);

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

    created: function () {
        console.log("parent created");
        this.store_list = this.$store.getters["store_list"];
        let that = this;
        console.log("created");

        this.pages["page_length"] = Math.ceil(
            this.store_list.length / this.pages["page_size"]
        ); //ページ数、決定
        console.log(this.pages["page_length"]);
        let sliced_store_list = this.store_list.slice(
            0,
            this.pages["page_size"]
        ); // 1ページ分のデータ

        // media_data取得ーーーーーーー
        // this.create_data(sliced_store_list.slice(0,2));
        this.create_data(sliced_store_list);

        // console.log(this.content_list);
        // console.log(JSON.stringify(this.review_obj_list));
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

<style>
*,
*:before,
*:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
<style scoped>
.bg {
    background-color: rgba(0, 0, 0, 0);

    background-attachment: fixed;

    /* height: 100%; */
    height: 100vh;
    /* 必須 */

    animation: opaMove 3s 3s forwards;
}
.store_list_wrap {
    /* height: 100vh; */
    /* overflow: scroll; */
    height: calc(100vh - 40px);
    overflow: scroll;
}
.store_list_wrap::-webkit-scrollbar {
    display: none;
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
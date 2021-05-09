<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <AreaSearch :area_list="area_list" @get_area_obj="get_area_obj" />
            <StoreSearch :store_list="store_list" @get_ref="get_ref" />
            <Nuxt-link to="store_list/">決定</Nuxt-link>
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
            media_data_list_by_store: [],
            content_list: [],


        };
    },

    async fetch({ store, $axios }) {
        // const res = await $axios
        await $axios
            .get("http://127.0.0.1:8000/api/area/")
            .then(function(res){
                store.commit("set_area_list", res.data);

            })
            .catch(function (e) {
                console.log(e);
            });

        // テスト 船橋の店だけ先に取得
        const res2 = await $axios
            .get("http://127.0.0.1:8000/api/stores/?area=1")
            .catch(function (e) {
                console.log(e);
            });
        store.commit("set_store_list", res2.data);
        // ーーーーーーーーーーーーーーー
        let that = this;
        // media_data取得ーーーーーーー
        let media_data_list_by_store = [];
        // for (var i in sliced_store_list) {
        for(var num = 1; num <=10 ; num++){

            // var store_data = sliced_store_list[i];
            await $axios
                .get(
                    // `http://127.0.0.1:8000/api/media_data/?store=${store_data.id}`
                    `http://127.0.0.1:8000/api/media_data/?store=${num}`
                )
                .then(function (res) {
                    media_data_list_by_store.push(res.data);
                })
                .catch(function (e) {
                    console.log(e);
                });
        }
        console.log(media_data_list_by_store);

        // 成形
        for (var i in media_data_list_by_store) {
            let media_data = media_data_list_by_store[i];

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
            media_data_list_by_store.forEach((media_d) => {
                media_d.sort(
                    (x, y) =>
                        junban.indexOf(x["media_type"]["media_type"]) -
                        junban.indexOf(y["media_type"]["media_type"])
                );
            });
        }
        // console.log(JSON.stringify(media_data_list_by_store));

        let content_list = [];
        let review_obj_list = [];
        for (var media_data_by_store of media_data_list_by_store) {
            for (var media_data of media_data_by_store) {
                await $axios
                    .get(
                        `http://127.0.0.1:8000/api/reviews/?media=${media_data.id}`
                    )
                    .then(function (res) {
                        review_obj_list.push(res.data.slice(0, 3)); // sliceで制限かける

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
                        console.log(content_list);
                        content_list.push(contents.slice(0, 3)); // 範囲制限
                    })
                    .catch(function (e) {
                        console.log(e);
                    });
            }
        }

        // 2次元配列を1次元に＆日付け降順
        content_list = content_list.flat(1);
        content_list.sort((x, y) => {
            if (x["review_date"] > y["review_date"]) {
                return -1;
            } else {
                return 1;
            }
        });

        // console.log(content_list);
        // console.log(this.review_obj_list);
        // console.log(media_data_list_by_store);
        // this.$store.commit("set_review_obj_list", this.review_obj_list);
        store.commit("set_media_data_list_by_store", media_data_list_by_store);
        store.commit("set_content_list", content_list);

        // console.log(JSON.stringify(this.review_obj_list));
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

            //テストで消してる
            // // create_store_list
            // this.$axios
            //     .get(`http://127.0.0.1:8000/api/stores/?area=${obj.id}`)
            //     .then(function (res) {
            //         that.store_list = res.data;
            //     })
            //     .catch(function (e) {
            //         console.log(e);
            //     });

            this.ref.focus(); // 店名入力フォームにフォーカス
        },

        get_ref: function (obj) {
            this.ref = obj;
        },
    },
};
</script>

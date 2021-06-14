<template>
    <!-- enter押してもブラウザロードしないように -->
    <v-form
        @submit.prevent="store_submit"
        class="search_box d-flex flex-column"
        v-cloak
    >
        <v-text-field
            v-model.trim="search_word"
            label="店名"
            prepend-icon="mdi-store"
            ref="store_search"
            append-outer-icon="mdi-send"
            @click:append-outer="store_submit"
            clear-icon="mdi-close-circle"
            clearable
            filled
            dark
            background-color="rgba(255, 255, 255, 0.2)"
            v-cloak
        />

        <!-- インクリメンタルサーチ -->
        <div class="list_items">
            <transition-group name="incre_search">
                <v-card
                    v-for="(store_data, index) in filtered_store"
                    :key="store_data.id"
                    @click="store_submit_by_incremental(store_data)"
                    hover
                    class="list_item pr-2 pl-2 mb-2 ml-8"
                >
                    <!-- :class="index % 2 == 1 ? `isEven` : `noEven`" -->
                    <span v-html="store_data.store_name"></span>
                </v-card>
            </transition-group>
        </div>
    </v-form>
</template>


<script>
export default {
    data() {
        return {
            search_word: "",
            f_store_list_pure: [],
        };
    },

    props: {
        store_list: Array,
    },

    methods: {
        store_submit(event) {
            // let store_obj = this.store_list.find(
            //     (v) => v.id == this.f_store_list_pure[0].id
            // );
            // console.log(store_obj);  //これなんだっけ
            this.$router.push({ path: "store_list/" });
            this.$store.commit("set_store_search_word", this.search_word);
            if (this.search_word.length == 0) {
                this.$store.commit("set_store_list", this.store_list);
            } else {
                this.$store.commit("set_store_list", this.f_store_list_pure);
            }
        },
        store_submit_by_incremental(selected) {
            this.$router.push({ path: "store_list/" });
            this.$store.commit("set_store_search_word", this.search_word);

            let store_obj = this.f_store_list_pure.find(
                // (v) => (v.id == v.id) == selected.id
                (v) => v.id == selected.id
            );
            console.log("selected_store", store_obj);

            // 選んだ店を消去 → 先頭に入れる
            this.f_store_list_pure.splice(
                this.f_store_list_pure.indexOf(store_obj),
                1
            );
            this.f_store_list_pure.unshift(store_obj);

            this.$store.commit("set_store_list", this.f_store_list_pure);
            // console.log(this.f_store_list_pure);
        },
    },

    computed: {
        filtered_store: function () {
            this.f_store_list_pure = [];
            let temp_list = [];
            if (!this.search_word) {
                return temp_list;
            } else {
                // カタカナ → ひらがな関数
                function kanaToHira(str) {
                    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
                        var chr = match.charCodeAt(0) - 0x60;
                        return String.fromCharCode(chr);
                    });
                }

                const search_word_hira = kanaToHira(
                    this.search_word.replaceAll(" ", "")
                );

                for (var i in this.store_list) {
                    let origin_store_data = this.store_list[i];
                    let store_data = Object.assign({}, this.store_list[i]); // 複製
                    let name = store_data.store_name;
                    let hira_trans_name = kanaToHira(name);
                    let yomigana = store_data.yomigana || "";
                    let yomi_roma = store_data.yomi_roma || "";
                    // console.log(yomigana);
                    if (
                        hira_trans_name
                            .replaceAll(" ", "")
                            .toLowerCase()
                            .indexOf(search_word_hira.toLowerCase()) != -1
                    ) {
                        this.f_store_list_pure.push(origin_store_data);

                        // 空白の文字位置
                        let ws_index_list = [];
                        let position = 0;
                        let order = 1;
                        while (name.length > position) {
                            if (name.indexOf(" ", position) != -1) {
                                let space_index = name.indexOf(" ", position);
                                ws_index_list.push({
                                    // 順番番号、兼、index番号の追加数
                                    order: order,
                                    // 空白除去時の、空白あったindex番号
                                    space_index: space_index - (order - 1),
                                });
                                order += 1;
                                position = space_index + 1;
                            } else {
                                // 空白なくなったらwhile終わらせるため
                                position = name.length;
                            }
                        }

                        // 着色ーーーーーーーーーーーーーー
                        // search_wordのstr.indexOf 空白除去時
                        var hit_index = hira_trans_name
                            .replaceAll(" ", "")
                            .toLowerCase()
                            .indexOf(search_word_hira.toLowerCase());

                        // 空白部分をまたいだ際の調整
                        let add_num = 0;
                        // 後ろからふるいにかけるため
                        let reversed_ws_list = ws_index_list.reverse();
                        for (let ws_obj of reversed_ws_list) {
                            if (hit_index >= ws_obj["space_index"]) {
                                add_num = ws_obj["order"];
                                break;
                            }
                        }
                        let hit_index_in_space = hit_index + add_num;

                        // search_wordの最後の文字で照合 indexOfの第2引数がミソ
                        var hit_index_last = hira_trans_name
                            .replaceAll(" ", "")
                            .toLowerCase()
                            .indexOf(
                                search_word_hira.slice(-1).toLowerCase(),
                                hit_index + search_word_hira.length - 1
                            );

                        let add_num_last = 0;
                        for (let ws_obj of reversed_ws_list) {
                            if (hit_index_last >= ws_obj["space_index"]) {
                                add_num_last = ws_obj["order"];
                                break;
                            }
                        }
                        let hit_index_last_in_space =
                            hit_index_last + add_num_last;

                        // html改造ーーーーーーーーー
                        store_data.store_name = `${name.slice(
                            0,
                            hit_index_in_space
                        )}<span class="highlight" style="background:rgba(255, 255, 0, .4);" >${name.slice(
                            hit_index_in_space,
                            hit_index_last_in_space + 1
                        )}</span>${name.slice(hit_index_last_in_space + 1)}`;

                        temp_list.push(store_data);
                    } else if (
                        kanaToHira(yomigana)
                            .replaceAll(" ", "")
                            .toLowerCase()
                            .indexOf(this.search_word.toLowerCase()) != -1
                    ) {
                        this.f_store_list_pure.push(origin_store_data);
                        temp_list.push(store_data);
                        // console.log(
                        //     kanaToHira(yomigana).replaceAll(" ", "").toLowerCase()
                        // );
                    } else if (
                        yomi_roma
                            .replaceAll(" ", "")
                            .toLowerCase()
                            .indexOf(this.search_word.toLowerCase()) != -1
                    ) {
                        this.f_store_list_pure.push(origin_store_data);
                        temp_list.push(store_data);
                        // console.log(
                        //     yomi_roma.replaceAll(" ", "").toLowerCase()
                        // );
                    }
                }
                return temp_list.slice(0, 20);
            }
        },
    },

    mounted: function () {
        // ページ帰還時にsearch_wordを保持する
        this.search_word = this.$store.getters["store_search_word"].length
            ? this.$store.getters["store_search_word"]
            : "";

        // 自動でフォーカスするためのカーソル情報
        return this.$emit("get_ref", this.$refs.store_search);
    },
};
</script>

<style scoped>
.v-form {
    height: auto;
    max-height: 78vh;
    /* max-height: 100%; */
}
.v-input {
    font-size: large;
    font-weight: bolder;
}
.v-sheet.v-card {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    width: fit-content;
}
.v-sheet:hover {
    background: rgba(150, 150, 0, 1);
}

.list_items {
    overflow: scroll;
    -ms-overflow-style: none;
    padding-right: 34px;
}
.list_items::-webkit-scrollbar {
    display: none;
}

/* トランジションーーーーーーー */
.v-sheet.v-card--hover {
    transition: transform 0.5s, opacity 0.4s;
    /* transition-duration: .7s; */
    display: inline-block;
}
.incre_search-enter,
.incre_search-leave-to {
    /* transform: scale(0); */
    transform: translateX(50px);
    opacity: 0;
}
/* .incre_search-enter-active,  */
.incre_search-leave-active {
    position: absolute;
}
/* これかけると少し変わる */
.incre_search-move {
    /* transition: transform .5s; */
}

/* @media screen and (max-width:960px){
    .incre_search-leave-active {
        position: static;
    }
    .incre_search-move{
        transition: transform .5s;
    }
} */

@media screen and (max-width: 960px) {
    .search_box {
        /* max-height: 70%; */
        /* flex-shrink: 1; */
    }
    .list_items {
        min-height: 30vh;
        max-height: 44vh;
    }
    .incre_search-leave-active {
        position: relative;
    }
}
</style>
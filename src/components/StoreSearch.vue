<template>
    <v-col cols="12" sm="8" md="6" class="search_box">
        <!-- enter押してもブラウザロードしないように -->
        <v-form
            @submit.prevent="store_submit"
            class="d-flex flex-column"
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
    </v-col>
</template>


<script>
export default {
    data() {
        return {
            search_word: "",
            f_store_list: [],
        };
    },

    props: {
        store_list: Array,
    },

    methods: {
        store_submit(event) {
            // let store_obj = this.store_list.find(
            //     (v) => v.id == this.f_store_list[0].id
            // );
            // console.log(store_obj);  //これなんだっけ
            this.$router.push({ path: "store_list/" });
            this.$store.commit("set_store_search_word", this.search_word);
            if (this.search_word.length == 0) {
                this.$store.commit("set_store_list", this.store_list);
            } else {
                this.$store.commit("set_store_list", this.f_store_list);
            }
        },
        store_submit_by_incremental(selected) {
            let store_obj = this.store_list.find(
                (v) => (v.id == v.id) == selected.id
            );
            console.log(store_obj);
            this.$router.push({ path: "store_list/" });
            this.$store.commit("set_store_search_word", this.search_word);

            // 選んだ店を消去 → 先頭に入れる
            this.f_store_list.splice(this.f_store_list.indexOf(selected), 1);
            this.f_store_list.unshift(selected);

            this.$store.commit("set_store_list", this.f_store_list);
        },
    },

    computed: {
        filtered_store: function () {
            this.f_store_list = [];
            if (!this.search_word) {
                return this.f_store_list;
            } else {
                // カタカナ → ひらがな関数
                function kanaToHira(str) {
                    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
                        var chr = match.charCodeAt(0) - 0x60;
                        return String.fromCharCode(chr);
                    });
                }

                const search_word_hira = kanaToHira(this.search_word);

                for (var i in this.store_list) {
                    let store_data = Object.assign({}, this.store_list[i]); // 複製
                    let name = store_data.store_name;
                    let hira_trans_name = kanaToHira(name);
                    if (
                        hira_trans_name
                            .toLowerCase()
                            .indexOf(search_word_hira.toLowerCase()) != -1
                    ) {
                        // search_wordのstr.indexOf
                        var hit_index = hira_trans_name
                            .toLowerCase()
                            .indexOf(search_word_hira.toLowerCase());
                        // search_wordの最後の文字で照合 indexOfの第2引数がミソ
                        var hit_index_last = hira_trans_name
                            .toLowerCase()
                            .indexOf(
                                search_word_hira.slice(-1).toLowerCase(),
                                hit_index + search_word_hira.length - 1
                            );

                        store_data.store_name = `${name.slice(
                            0,
                            hit_index
                        )}<span class="highlight" style="background:rgba(255, 255, 0, .4);" >${name.slice(
                            hit_index,
                            hit_index_last + 1
                        )}</span>${name.slice(hit_index_last + 1)}`;

                        this.f_store_list.push(store_data);
                    }
                }
                return this.f_store_list.slice(0, 20);
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
.search_box {
    height: 100%;
}
.v-form {
    height: auto;
    max-height: 100%;
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
}
.list_items::-webkit-scrollbar {
    display: none;
}

/* トランジションーーーーーーー */
.list_item {
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
        max-height: 70%;
        flex-shrink: 1;
    }
    .incre_search-leave-active {
        position: relative;
    }
}
</style>
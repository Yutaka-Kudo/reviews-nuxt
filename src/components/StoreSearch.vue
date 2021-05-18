<template>
    <div>
        <!-- enter押してもブラウザロードしないように -->
        <v-form @submit.prevent="store_submit">
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
            />

            <!-- インクリメンタルサーチ -->
            <ul>
                <li
                    v-for="(store_data, index) in filtered_store"
                    :key="store_data.id"
                    :class="index % 2 == 1 ? `isEven` : `noEven`"
                    @click="store_submit_by_incremental(store_data)"
                >
                    <span v-html="store_data.store_name"></span>
                </li>
            </ul>
        </v-form>
    </div>
</template>


<script>
export default {
    data() {
        return {
            search_word: "",
        };
    },

    props: {
        store_list: Array,
    },

    methods: {
        store_submit(event) {
            this.$router.push({ path: "store_list/" });
            this.$store.commit("set_store_search_word", this.search_word);
            this.$store.commit("set_store_list", this.filtered_store);
            // 日本語入力中のkeycodeは229。そこで発火しないように
            // if (event.keyCode !== 229) {
            // }
            // なぜかこれ付けなくてもいける！！！！！
        },
        store_submit_by_incremental(store_obj) {
            this.$router.push({ path: "store_list/" });
            this.$store.commit("set_store_search_word", this.search_word);

            // 選んだ店を消去 → 先頭に入れる
            this.filtered_store.splice(
                this.filtered_store.indexOf(store_obj),
                1
            );
            this.filtered_store.unshift(store_obj);

            this.$store.commit("set_store_list", this.filtered_store);
        },
    },

    computed: {
        filtered_store: function () {
            var f_store_list = [];
            if (!this.search_word) {
                return f_store_list;
            } else {
                for (var i in this.store_list) {
                    let store_data = Object.assign({}, this.store_list[i]); // 複製
                    let name = store_data.store_name;
                    if (
                        name
                            .toLowerCase()
                            .indexOf(this.search_word.toLowerCase()) != -1
                    ) {
                        // search_wordのstr.indexOf
                        var hit_index = name
                            .toLowerCase()
                            .indexOf(this.search_word.toLowerCase());
                        // search_wordの最後の文字で照合 indexOfの第2引数がミソ
                        var hit_index_last = name
                            .toLowerCase()
                            .indexOf(
                                this.search_word.slice(-1).toLowerCase(),
                                hit_index + this.search_word.length - 1
                            );

                        store_data.store_name = `${name.slice(
                            0,
                            hit_index
                        )}<span class="highlight" style="background:yellow;" >${name.slice(
                            hit_index,
                            hit_index_last + 1
                        )}</span>${name.slice(hit_index_last + 1)}`;

                        f_store_list.push(store_data);
                    }
                }
                return f_store_list;
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
.isEven {
    list-style: none;
    /* color: white; */
    /* background: #757575; */
    background: #d6d4d4;
    border-radius: 3px;
    width: max-content;
}
.isEven:hover {
    background: #fb8c00;
}
.noEven {
    list-style: none;
    width: max-content;
}
.noEven:hover {
    background: #ffcc80;
}
</style>
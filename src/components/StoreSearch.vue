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
                    v-for="(store_data, index) in filterd_store"
                    :key="store_data.id"
                    :class="index % 2 == 1 ? `isEven` : `noEven`"
                    @click="store_submit_by_incremental(store_data)"
                >
                    {{ store_data.store_name }}
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
            this.$store.commit("set_store_list", this.filterd_store);
            // 日本語入力中のkeycodeは229。そこで発火しないように
            // if (event.keyCode !== 229) {
            // }
            // なぜかこれ付けなくてもいける！！！！！
        },
        store_submit_by_incremental(store_obj) {
            this.$router.push({ path: "store_list/" });
            this.$store.commit("set_store_search_word", this.search_word);
            this.$store.commit("set_store_list", this.filterd_store);
        },
    },

    computed: {
        filterd_store: function () {
            var f_store_list = [];
            if (!this.search_word) {
                return f_store_list;
            } else {
                for (var i in this.store_list) {
                    let store_data = this.store_list[i];
                    let name = store_data.store_name;
                    if (
                        name
                            .toLowerCase()
                            .indexOf(this.search_word.toLowerCase()) != -1
                    ) {
                        f_store_list.push(store_data);
                    }
                }
                return f_store_list;
            }
        },
    },

    mounted: function () {
        this.search_word = this.$store.getters["store_search_word"].length
            ? this.$store.getters["store_search_word"]
            : "";
        return this.$emit("get_ref", this.$refs.store_search);
    },
};
</script>

<style scoped>
.isEven {
    color: white;
    /* background: #ddd; */
    background: #757575;
    border-radius: 3px;
    width: max-content;
}
.isEven:hover {
    background: #fb8c00;
}
.noEven {
    width: max-content;
}
.noEven:hover {
    background: #ffcc80;
}
</style>
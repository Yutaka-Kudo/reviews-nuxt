<template>
    <!-- enter押してもブラウザロードしないように -->
    <v-form
        @submit.prevent="area_submit"
        class="search_box d-flex flex-column"
        v-cloak
    >
        <v-text-field
            v-model.trim="search_word"
            label="エリア"
            prepend-icon="mdi-earth-box-plus"
            append-outer-icon="mdi-send"
            @click:append-outer="area_submit"
            clear-icon="mdi-close-circle"
            clearable
            filled
            dark
            background-color="rgba(255, 255, 255, 0.3)"
            v-cloak
        />
        <!-- autofocus -->
        <!-- rounded -->

        <!-- インクリメンタルサーチ -->
        <div class="list_items mb-auto">
            <transition-group name="incre_search">
                <v-card
                    v-for="(area_data, index) in filtered_area"
                    :key="area_data.id"
                    @click="area_submit_by_incremental(area_data)"
                    class="list_item pr-2 pl-2 mb-2 ml-8"
                >
                    <!-- :class="index % 2 == 1 ? `isEven` : `noEven`" -->
                    <span v-html="area_data.area_name"></span>
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
        };
    },
    props: {
        area_list: { type: Array },
    },
    methods: {
        area_submit(event) {
            let area_obj = this.area_list.find(
                (v) => v.id == this.filtered_area[0].id
            );
            this.search_word = area_obj.area_name;
            this.$emit("get_area_obj", area_obj);
            this.$store.commit("set_area_search_word", area_obj.area_name);
            // 日本語入力中のkeycodeは229。そこで発火しないように
            // if (event.keyCode !== 229) {
            // }
            // なぜかこれ付けなくてもいける！！！！！
        },
        area_submit_by_incremental(selected) {
            let area_obj = this.area_list.find((v) => v.id == selected.id);
            this.search_word = area_obj.area_name;
            this.$emit("get_area_obj", area_obj);
            this.$store.commit("set_area_search_word", area_obj.area_name);
        },
    },
    computed: {
        filtered_area: function () {
            let temp_list = [];
            if (!this.search_word) {
                return temp_list;
            } else {
                for (var i in this.area_list) {
                    let area_data = Object.assign({}, this.area_list[i]); // 複製
                    let name = area_data.area_name;
                    let yomigana = area_data.yomigana;
                    let yomi_roma = area_data.yomi_roma;
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

                        area_data.area_name = `${name.slice(
                            0,
                            hit_index
                        )}<span class="highlight" style="background:rgba(255, 255, 0, .3);" >${name.slice(
                            hit_index,
                            hit_index_last + 1
                        )}</span>${name.slice(hit_index_last + 1)}`;

                        temp_list.push(area_data);
                    } else if (
                        yomigana
                            .toLowerCase()
                            .indexOf(this.search_word.toLowerCase()) != -1
                    ) {
                        temp_list.push(area_data);
                    } else if (
                        yomi_roma
                            .toLowerCase()
                            .indexOf(this.search_word.toLowerCase()) != -1
                    ) {
                        temp_list.push(area_data);
                    }
                }
                return temp_list;
            }
        },
    },

    created: function () {
        this.search_word = this.$store.getters["area_search_word"].length
            ? this.$store.getters["area_search_word"]
            : "";
        console.log(this.area_list);
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
}
.list_items::-webkit-scrollbar {
    display: none;
}
/* トランジションーーーーーーー */
.list_item {
    transition: transform 0.5s, opacity 0.4s;
    display: inline-block;
}
.incre_search-enter,
.incre_search-leave-to {
    /* transform: scale(0); */
    transform: translateX(-50px);
    opacity: 0;
}
/* .incre_search-enter-active,  */
.incre_search-leave-active {
    position: absolute;
}
/* これかけると少し変わる */
/* .incre_search-move{
    transition: transform .5s;
} */

@media screen and (max-width: 960px) {
    .search_box {
        /* max-height: 80%; */
        /* flex-shrink: 1; */
        /* flex-basis: initial; */
    }
}
</style>
<style>
</style>
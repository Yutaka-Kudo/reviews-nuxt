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
            this.$store.commit("set_selected_area", area_obj.yomi_roma);
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
            this.$store.commit("set_selected_area", area_obj.yomi_roma);
            this.$store.commit("set_area_search_word", area_obj.area_name);
        },
    },
    computed: {
        filtered_area: function () {
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

                const search_word_hira = kanaToHira(this.search_word.replaceAll(' ',''));

                for (var i in this.area_list) {
                    // let origin_area_data = this.area_list[i];
                    let area_data = Object.assign({}, this.area_list[i]); // 複製
                    let name = area_data.area_name;
                    let hira_trans_name = kanaToHira(name);
                    let yomigana = area_data.yomigana;
                    let yomi_roma = area_data.yomi_roma;
                    if (
                        hira_trans_name
                            .replaceAll(" ", "")
                            .toLowerCase()
                            .indexOf(search_word_hira.toLowerCase()) != -1
                    ) {
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
                        area_data.area_name = `${name.slice(
                            0,
                            hit_index_in_space
                        )}<span class="highlight" style="background:rgba(255, 255, 0, .4);" >${name.slice(
                            hit_index_in_space,
                            hit_index_last_in_space + 1
                        )}</span>${name.slice(hit_index_last_in_space + 1)}`;

                        temp_list.push(area_data);
                    } else if (
                        yomigana.replaceAll(' ','')
                            .toLowerCase()
                            .indexOf(search_word_hira.toLowerCase()) != -1
                    ) {
                        temp_list.push(area_data);
                    } else if (
                        yomi_roma.replaceAll(' ','')
                            .toLowerCase()
                            .indexOf(search_word_hira.toLowerCase()) != -1
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